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

    // Provide fallback data in case of API failure
    const fallbackData = {
      search_query: `${formData.category || 'business'} website template`,
      reasoning: 'Based on your requirements',
      preview_url: 'https://example.com',
      plain_description: plainEnglishDescription,
      served_url: 'https://example.com'
    };

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

    // If we get a 404, use fallback data without logging an error
    if (response.status === 404) {
      console.log('API endpoint not found, using fallback data');
      return {
        ...fallbackData,
        reasoning: 'Using example template while our API is being updated',
      };
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
      return {
        ...fallbackData,
        reasoning: 'Using example template due to response parsing error'
      };
    }
  } catch (error) {
    console.error('Error getting theme preview:', error);
    return {
      search_query: `${formData.category || 'business'} website template`,
      reasoning: 'Using example template while our service is being updated',
      preview_url: 'https://example.com',
      served_url: 'https://example.com',
      plain_description: `Creating a ${formData.category || 'business'} website`
    };
  }
};