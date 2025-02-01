interface ThemePreviewResponse {
  search_query: string;
  reasoning: string;
  preview_url: string;
}

export const getThemePreview = async (formData: Record<string, string>): Promise<ThemePreviewResponse> => {
  try {
    // Create a description from form data
    const description = Object.entries(formData)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    const response = await fetch('https://webdevs.applytocollege.pk/get_theme_preview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description
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