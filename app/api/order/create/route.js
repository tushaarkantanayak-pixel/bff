export async function POST(req) {
  return Response.json(
    {
      success: false,
      message: "This endpoint is deprecated and insecure. Please use other.",
    },
    { status: 410 }
  );
}
