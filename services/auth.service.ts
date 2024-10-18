interface LoginForm {
  url?: string;
  usr: string;
  pwd: string;
}

export const login = async (form: LoginForm) => {
  console.log(form);
  const url = `https://${form.url}`;

  const formData = new FormData();
  formData.append('usr', form.usr);
  formData.append('pwd', form.pwd);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Login successful:', data);
    return data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
