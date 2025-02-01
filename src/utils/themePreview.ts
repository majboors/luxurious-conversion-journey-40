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

    return await response.json();
  } catch (error) {
    console.error('Error getting theme preview:', error);
    throw error;
  }
};