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
      plain_description: plainEnglishDescription
    };

    try {
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

      if (!response.ok) {
        console.log('API Response not OK:', response.status, response.statusText);
        console.log('Using fallback data');
        return fallbackData;
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
        return fallbackData;
      }
    } catch (apiError) {
      console.log('API Error:', apiError);
      return fallbackData;
    }
  } catch (error) {
    console.error('Error getting theme preview:', error);
    throw error;
  }
};