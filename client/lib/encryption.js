export async function generateWallet(){
  const keyPair = await crypto.subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-256",
    },
    true,
    ["sign", "verify"]
  );

  const spki = await crypto.subtle.exportKey("spki", keyPair.publicKey);
  const pkcs8 = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

  const pubPem = toPem(spki, "PUBLIC KEY");
  const privPem = toPem(pkcs8, "PRIVATE KEY");

  return { pubPem, privPem };
}

function toPem(exported, label){
  const base64 = btoa(String.fromCharCode(...new Uint8Array(exported)));
  const wrapped = base64.match(/.{1,64}/g).join("\n");

  return `-----BEGIN ${label}-----\n${wrapped}\n-----END ${label}-----`;
}
