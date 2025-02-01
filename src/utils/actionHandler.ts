interface ActionData {
  text?: string;
  button_id?: string;
  direction?: string;
  form_data?: Record<string, unknown>;
}

interface ActionResponse {
  action_type: string;
  status: string;
  timestamp: string;
  button_action?: string;
}

export const handleAction = async (
  action_type: string,
  action_data: ActionData
): Promise<ActionResponse> => {
  try {
    const response = await fetch('https://webdevs.applytocollege.pk/handle_action', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action_type,
        action_data,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error handling action:', error);
    return {
      action_type,
      status: 'error',
      timestamp: new Date().toISOString(),
    };
  }
};