export const sha1=async (str)=> {
        const buffer = await crypto.subtle.digest("SHA-1",new TextEncoder().encode(str));
        return Array.from(new Uint8Array(buffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
      }
 
      sha1("FARKI").then(console.log);