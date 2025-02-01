interface ThemePreviewResponse {
  search_query: string;
  reasoning: string;
  preview_url: string;
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

    try {
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
        throw new Error('API request failed');
      }

      const rawResponse = await response.text();
      console.log('Raw API Response:', rawResponse);

      const jsonResponse = JSON.parse(rawResponse);
      return {
        ...jsonResponse,
        raw_response: rawResponse,
        plain_description: plainEnglishDescription
      };
    } catch (error) {
      console.log('API Error:', error);
      // Provide fallback values when the API fails
      return {
        search_query: formData.websiteName || 'Your Website',
        reasoning: 'Based on your requirements',
        preview_url: 'https://example.com',
        plain_description: plainEnglishDescription,
        raw_response: JSON.stringify({ error: 'API request failed' })
      };
    }
  } catch (error) {
    console.error('Error getting theme preview:', error);
    throw error;
  }
};