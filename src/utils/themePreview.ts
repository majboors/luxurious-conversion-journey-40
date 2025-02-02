interface ThemePreviewResponse {
  search_query: string;
  reasoning: string;
  preview_url: string;
  served_url?: string;
  raw_response?: string;
  plain_description?: string;
}

export const getThemePreview = async (formData: Record<string, string>): Promise<ThemePreviewResponse> => {
  try {
    // Only construct description if we have valid form data
    const hasValidData = formData.websiteName || formData.websiteDescription || formData.category || formData.goal || formData.traffic;

    // Convert form data to plain English description
    const plainEnglishDescription = hasValidData ? `
      I want to create a website called "${formData.websiteName || 'Untitled'}".
      ${formData.websiteDescription ? `The website is about ${formData.websiteDescription}.` : ''}
      ${formData.category ? `It falls under the ${formData.category} category.` : ''}
      ${formData.goal ? `The main goal is to ${formData.goal}.` : ''}
      ${formData.traffic ? `We are expecting ${formData.traffic} visitors.` : ''}
    `.trim() : 'No website requirements provided.';

    // Enhanced fallback data based on user input
    const getFallbackData = (reason: string) => ({
      search_query: `${formData.category || 'professional'} ${formData.websiteName || 'business'} website template`,
      reasoning: reason,
      preview_url: formData.category === 'Ecommerce' 
        ? 'https://shopify.com/examples' 
        : formData.category === 'Portfolio' 
          ? 'https://www.wix.com/website/templates/html/portfolio' 
          : 'https://example.com',
      plain_description: plainEnglishDescription,
      served_url: formData.category === 'Ecommerce' 
        ? 'https://shopify.com/examples' 
        : formData.category === 'Portfolio' 
          ? 'https://www.wix.com/website/templates/html/portfolio' 
          : 'https://example.com'
    });

    console.log('Calling theme preview API with description:', plainEnglishDescription);
    
    const response = await fetch('https://webdevs.applytocollege.pk/get_theme_preview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: plainEnglishDescription
      }),
    });

    // Handle 404 case specifically
    if (response.status === 404) {
      console.log('No products found, using enhanced fallback data');
      return getFallbackData(
        'We are preparing a custom template based on your requirements. In the meantime, here is a professional template that matches your needs.'
      );
    }

    if (!response.ok) {
      console.log('API Response not OK:', response.status, response.statusText);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const rawResponse = await response.text();
    console.log('Raw API Response:', rawResponse);

    try {
      const jsonResponse = JSON.parse(rawResponse);
      return {
        ...jsonResponse,
        raw_response: rawResponse,
        plain_description: plainEnglishDescription
      };
    } catch (parseError) {
      console.log('Error parsing JSON response:', parseError);
      return getFallbackData(
        'We have selected a professional template while our service processes your specific requirements.'
      );
    }
  } catch (error) {
    console.error('Error getting theme preview:', error);
    return getFallbackData(
      'We have selected a template that matches your industry requirements.'
    );
  }
};