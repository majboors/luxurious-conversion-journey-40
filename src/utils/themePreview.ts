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
      throw new Error('Failed to get theme preview');
    }

    const rawResponse = await response.text();
    console.log('Raw API Response:', rawResponse);

    // Parse the response and also return the raw text and plain description
    const jsonResponse = JSON.parse(rawResponse);
    return {
      ...jsonResponse,
      raw_response: rawResponse,
      plain_description: plainEnglishDescription
    };
  } catch (error) {
    console.error('Error getting theme preview:', error);
    throw error;
  }
};