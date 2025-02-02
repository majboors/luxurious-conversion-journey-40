interface ThemePreviewResponse {
  search_query: string;
  reasoning: string;
  preview_url: string;
  served_url?: string;
  raw_response?: string;
  plain_description?: string;
}

const getFallbackData = (formData: Record<string, string>, reason: string): ThemePreviewResponse => {
  // Enhanced fallback URLs based on category
  const getCategoryUrl = (category: string) => {
    const categoryUrls: Record<string, string> = {
      'Ecommerce': 'https://shopify.com/examples',
      'Portfolio': 'https://www.wix.com/website/templates/html/portfolio',
      'Blogs': 'https://wordpress.com/themes/blog',
      'Events': 'https://www.squarespace.com/templates/events',
    };
    return categoryUrls[category] || 'https://example.com';
  };

  const previewUrl = getCategoryUrl(formData.category);

  return {
    search_query: `${formData.category || 'professional'} ${formData.websiteName || 'business'} website template`,
    reasoning: reason,
    preview_url: previewUrl,
    plain_description: constructPlainDescription(formData),
    served_url: previewUrl
  };
};

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

    // Handle 404 case with a more specific message
    if (response.status === 404) {
      console.log('No products found, using enhanced fallback data');
      return getFallbackData(formData, 
        'We have selected a professional template that matches your requirements while our service processes your specific request.'
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
        'We have selected a template that matches your industry while our system processes your requirements.'
      );
    }
  } catch (error) {
    console.error('Error getting theme preview:', error);
    return getFallbackData(formData,
      'We have selected a professional template while our service is being optimized.'
    );
  }
};