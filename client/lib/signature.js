export async function signMessage(privateKey, message) {
  // privateKey is a CryptoKey (or import from pkcs8)
  // message is string
  console.log({
    privateKey, message
  })
  const enc = new TextEncoder();
  const data = enc.encode(message);
  const privKey = await importPrivateKey(privateKey);
  console.log("priv : ", privKey);

  // subtle.sign returns DER encoded signature for ECDSA
  const signature = await crypto.subtle.sign(
    { name: "ECDSA", hash: { name: "SHA-256" } },
    privKey,
    data
  );

  // convert to base64
  let binary = '';
  const bytes = new Uint8Array(signature);
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

export async function importPrivateKey(pkcs8Pem) {
  const b64 = pkcs8Pem.replace(/-----[^-]+-----/g, '').replace(/\s+/g,'');
  const binary = atob(b64);
  const buf = new Uint8Array(binary.length);
  for (let i=0;i<binary.length;i++) buf[i] = binary.charCodeAt(i);
  return crypto.subtle.importKey('pkcs8', buf.buffer, { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]);
}