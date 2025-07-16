import type { NextRequest } from "next/server";

export const GET = (req: NextRequest) => {
  const url = new URL(req.url);
  const error =
    url.searchParams.get("error") ||
    "Something went wrong. Please login first.";

  return new Response(
    `
      <html>
        <head>
          <title>Unauthorized - PORTIFY</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              min-height: 100vh;
              background: linear-gradient(135deg, #fefbf3 0%, #fffef7 50%, #fefcfc 100%);
              color: #d97706;
              position: relative;
              overflow-x: hidden;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            /* Retro geometric background */
            .bg-shapes {
              position: absolute;
              inset: 0;
              opacity: 0.06;
              pointer-events: none;
            }
            
            .shape-1 {
              position: absolute;
              top: 80px;
              left: 80px;
              width: 128px;
              height: 128px;
              background: #fed7aa;
              transform: rotate(45deg);
            }
            
            .shape-2 {
              position: absolute;
              top: 160px;
              right: 128px;
              width: 96px;
              height: 96px;
              background: #fdc2c2;
              border-radius: 50%;
            }
            
            .shape-3 {
              position: absolute;
              bottom: 128px;
              left: 128px;
              width: 160px;
              height: 160px;
              background: #fde68a;
              transform: rotate(12deg);
            }
            
            .shape-4 {
              position: absolute;
              bottom: 80px;
              right: 80px;
              width: 112px;
              height: 112px;
              background: #fed7aa;
              border-radius: 50%;
            }
            
            .shape-5 {
              position: absolute;
              top: 50%;
              left: 20%;
              width: 80px;
              height: 80px;
              background: #fdc2c2;
              transform: rotate(-45deg);
            }

            .shape-6 {
              position: absolute;
              top: 20%;
              right: 20%;
              width: 64px;
              height: 64px;
              background: #fde68a;
              transform: rotate(30deg);
            }

            .shape-7 {
              position: absolute;
              bottom: 30%;
              right: 30%;
              width: 72px;
              height: 72px;
              background: #fed7aa;
              border-radius: 50%;
            }

            /* Retro grid pattern */
            .grid-pattern {
              position: absolute;
              inset: 0;
              opacity: 0.015;
              background-image: 
                linear-gradient(#fed7aa 1px, transparent 1px),
                linear-gradient(90deg, #fed7aa 1px, transparent 1px);
              background-size: 50px 50px;
            }

            /* Main content */
            .container {
              text-align: center;
              max-width: 600px;
              background: rgba(255, 255, 255, 0.95);
              padding: 4rem 3rem;
              border: 3px solid #fed7aa;
              border-radius: 12px;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
              backdrop-filter: blur(10px);
              position: relative;
              z-index: 10;
              margin: 2rem;
            }

            .container::before {
              content: '';
              position: absolute;
              top: -6px;
              left: -6px;
              right: -6px;
              bottom: -6px;
              background: linear-gradient(45deg, #fed7aa, #fdc2c2, #fde68a, #fed7aa);
              border-radius: 16px;
              z-index: -1;
            }

            .error-badge {
              display: inline-block;
              padding: 1rem 2.5rem;
              background: #f97316;
              color: #fffef7;
              font-weight: 900;
              font-size: 1.125rem;
              letter-spacing: 0.05em;
              margin-bottom: 2.5rem;
              transform: rotate(-2deg);
              border-radius: 6px;
              box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
            }

            .error-icon {
              font-size: 5rem;
              margin-bottom: 1.5rem;
              transform: rotate(-15deg);
              display: inline-block;
              filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
            }

            .error-title {
              font-size: 3.5rem;
              font-weight: 900;
              margin-bottom: 2rem;
              color: #d97706;
              line-height: 1;
              letter-spacing: 0.1em;
              transform: skew(-3deg);
              text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
            }

            .error-message {
              font-size: 1.375rem;
              margin-bottom: 3rem;
              color: #b45309;
              font-weight: 600;
              line-height: 1.6;
              max-width: 450px;
              margin-left: auto;
              margin-right: auto;
            }

            .login-button {
              display: inline-flex;
              align-items: center;
              gap: 1rem;
              background: #f97316;
              color: #fffef7;
              padding: 1.25rem 2.5rem;
              font-weight: 800;
              font-size: 1.25rem;
              text-decoration: none;
              border-radius: 6px;
              transition: all 0.3s ease;
              box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
              transform: scale(1);
              border: 3px solid #ea580c;
              position: relative;
              overflow: hidden;
            }

            .login-button::before {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
              transition: left 0.5s;
            }

            .login-button:hover::before {
              left: 100%;
            }

            .login-button:hover {
              background: #ea580c;
              transform: scale(1.05) rotate(-1deg);
              color: #fffef7;
              box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
            }

            .login-button:active {
              transform: scale(0.95);
            }

            /* Responsive */
            @media (max-width: 768px) {
              .container {
                padding: 3rem 2rem;
                margin: 1rem;
              }
              
              .error-title {
                font-size: 2.5rem;
              }
              
              .error-message {
                font-size: 1.125rem;
              }
              
              .login-button {
                padding: 1rem 2rem;
                font-size: 1.125rem;
              }

              .error-icon {
                font-size: 4rem;
              }

              .shape-1, .shape-3 {
                width: 80px;
                height: 80px;
              }

              .shape-2, .shape-4, .shape-5, .shape-6, .shape-7 {
                width: 60px;
                height: 60px;
              }
            }

            @media (max-width: 480px) {
              .container {
                padding: 2rem 1.5rem;
              }
              
              .error-title {
                font-size: 2rem;
              }
              
              .error-message {
                font-size: 1rem;
              }
              
              .login-button {
                padding: 0.875rem 1.75rem;
                font-size: 1rem;
                gap: 0.75rem;
              }

              .error-badge {
                padding: 0.75rem 1.5rem;
                font-size: 1rem;
              }
            }
          </style>
        </head>
        <body>
          <!-- Background elements -->
          <div class="bg-shapes">
            <div class="shape-1"></div>
            <div class="shape-2"></div>
            <div class="shape-3"></div>
            <div class="shape-4"></div>
            <div class="shape-5"></div>
            <div class="shape-6"></div>
            <div class="shape-7"></div>
          </div>
          <div class="grid-pattern"></div>
          
          <!-- Main content -->
          <div class="container">
            <div class="error-badge">${error}</div>
            <div class="error-icon">🚫</div>
            <h1 class="error-title">UNAUTHORIZED</h1>
            <p class="error-message">Something Went Wrong Try Again Later</p>
            <a href="/" class="login-button">
              <span>🔐</span>
              <span>GO TO HOMEPAGE</span>
              <span>→</span>
            </a>
          </div>
        </body>
      </html>
    `,
    {
      status: 401,
      headers: { "Content-Type": "text/html" },
    }
  );
};
