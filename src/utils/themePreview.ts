interface ThemePreviewResponse {
  search_query: string;
  reasoning: string;
  preview_url: string;
  served_url?: string;
  raw_response?: string;
  plain_description?: string;
}

// Move getFallbackData to module scope
const getFallbackData = (formData: Record<string, string>, reason: string) => ({
  search_query: `${formData.category || 'professional'} ${formData.websiteName || 'business'} website template`,
  reasoning: reason,
  preview_url: formData.category === 'Ecommerce' 
    ? 'https://shopify.com/examples' 
    : formData.category === 'Portfolio' 
      ? 'https://www.wix.com/website/templates/html/portfolio' 
      : 'https://example.com',
  plain_description: constructPlainDescription(formData),
  served_url: formData.category === 'Ecommerce' 
    ? 'https://shopify.com/examples' 
    : formData.category === 'Portfolio' 
      ? 'https://www.wix.com/website/templates/html/portfolio' 
      : 'https://example.com'
});

const constructPlainDescription = (formData: Record<string, string>): string => {
  const hasValidData = formData.websiteName || formData.websiteDescription || formData.category || formData.goal || formData.traffic;

  return hasValidData ? `
    I want to create a website called "${formData.websiteName || 'Untitled'}".
    ${formData.websiteDescription ? `The website is about ${formData.websiteDescription}.` : ''}
    ${formData.category ? `It falls under the ${formData.category} category.` : ''}
    ${formData.goal ? `The main goal is to ${formData.goal}.` : ''}
    ${formData.traffic ? `We are expecting ${formData.traffic} visitors.` : ''}
  `.trim() : 'No website requirements provided.';
};

export const getThemePreview = async (formData: Record<string, string>): Promise<ThemePreviewResponse> => {
  try {
    const description = constructPlainDescription(formData);
    console.log('Calling theme preview API with description:', description);
    
    const response = await fetch('https://webdevs.applytocollege.pk/get_theme_preview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description
      }),
    });

    console.log('API Response status:', response.status);

    // Handle 404 case specifically
    if (response.status === 404) {
      console.log('No products found, using enhanced fallback data');
      return getFallbackData(formData, 
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
        plain_description: description
      };
    } catch (parseError) {
      console.log('Error parsing JSON response:', parseError);
      return getFallbackData(formData,
        'We have selected a professional template while our service processes your specific requirements.'
      );
    }
  } catch (error) {
    console.error('Error getting theme preview:', error);
    return getFallbackData(formData,
      'We have selected a template that matches your industry requirements.'
    );
  }
};