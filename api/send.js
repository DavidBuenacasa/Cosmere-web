export async function POST(req) {
    const request = req.request;
    const resend = new Resend(import.meta.env.RESEND_API_KEY);
  
    try {
      const { email} = await request.json();
  
      console.log(email);
  
      return new Response(JSON.stringify({ code: "200" }), {
        status: 200,
      });
    } catch (error) {
      return new Response(JSON.stringify({ code: "500" }), {
        status: 500,
      });
    }
  }