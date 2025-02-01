interface ThemePreviewResponse {
  search_query: string;
  reasoning: string;
  preview_url: string;
}

export const getThemePreview = async (formData: Record<string, string>): Promise<ThemePreviewResponse> => {
  try {
    // Convert form data to plain English description
    const plainEnglishDescription = `
      I want to create a website called ${formData.websiteName}.
      The website is about ${formData.websiteDescription}.
      It falls under the ${formData.category} category.
      The main goal is to ${formData.goal}.
      We are expecting ${formData.traffic} visitors.
    `.trim();

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

    // Parse the response and also return the raw text
    const jsonResponse = JSON.parse(rawResponse);
    return {
      ...jsonResponse,
      raw_response: rawResponse // TypeScript will allow additional properties
    };
  } catch (error) {
    console.error('Error getting theme preview:', error);
    throw error;
  }
};