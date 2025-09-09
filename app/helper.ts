export async function getCategories() {
  const categories = await fetch("/api/category");
  return categories.json();
}

export async function addWidget(
  categoryId: string,
  widgetData: {
    title: string;
    type: string;
    data?: any;
  }
) {
  const response = await fetch(`/api/category/${categoryId}/widget`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(widgetData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to add widget");
  }

  return response.json();
}

export async function updateWidget(
  categoryId: string,
  widgetId: string,
  widgetData: {
    title: string;
    type: string;
    data?: any;
  }
) {
  const response = await fetch(
    `/api/category/${categoryId}/widget/${widgetId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(widgetData),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update widget");
  }

  return response.json();
}

export async function deleteWidget(categoryId: string, widgetId: string) {
  const response = await fetch(
    `/api/category/${categoryId}/widget/${widgetId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete widget");
  }

  return response.json();
}
