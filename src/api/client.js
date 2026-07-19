const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export async function login(username, password) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Login failed');
  }

  return res.json();
}

export async function postQR(matrix, token) {
  const res = await fetch(`${API_URL}/api/matrix/qr`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ matrix })
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'QR factorization failed');
  }

  return res.json();
}

export async function postRotate(matrix, token) {
  const res = await fetch(`${API_URL}/api/matrix/rotate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ matrix })
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Matrix rotation failed');
  }

  return res.json();
}
