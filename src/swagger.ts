 // Configuración con tema oscuro
const swaggerOptions = {
    explorer: true,
    customCss: `
        /* Fondo principal y wrapper */
        html{
        background-color: #1a1a1a !important;
        }
        .swagger-ui,
        .swagger-ui .wrapper {
          background-color: #1a1a1a !important;
          color: #ffffff !important;
        }
  
        /* Topbar */
        .swagger-ui .topbar {
          background-color: #1a1a1a !important;
        }
  
        /* Información general */
        .swagger-ui .info,
        .swagger-ui .info .title,
        .swagger-ui .info .title small,
        .swagger-ui .info p,
        .swagger-ui .info li {
          color: #ffffff !important;
        }
  
        /* Esquemas y contenedores */
        .swagger-ui .scheme-container {
          background-color: #2a2a2a !important;
          box-shadow: none !important;
        }
  
        /* Operaciones/endpoints */
        .swagger-ui .opblock {
          background-color: #2a2a2a !important;
          border: 1px solid #3a3a3a !important;
          box-shadow: none !important;
        }
  
        .swagger-ui .opblock .opblock-summary {
          background-color: #2a2a2a !important;
          border: none !important;
        }
  
        .swagger-ui .opblock.opblock-post .opblock-summary {
          background-color: #2a4a2a !important;
          border-color: #3a5a3a !important;
        }
  
        .swagger-ui .opblock.opblock-get .opblock-summary {
          background-color: #2a3a4a !important;
          border-color: #3a4a5a !important;
        }
  
        .swagger-ui .opblock.opblock-put .opblock-summary {
          background-color: #4a3a2a !important;
          border-color: #5a4a3a !important;
        }
  
        .swagger-ui .opblock.opblock-delete .opblock-summary {
          background-color: #4a2a2a !important;
          border-color: #5a3a3a !important;
        }
  
        .swagger-ui .opblock.opblock-patch .opblock-summary {
          background-color: #3a2a4a !important;
          border-color: #4a3a5a !important;
        }
  
        /* Texto de los endpoints */
        .swagger-ui .opblock-summary-method,
        .swagger-ui .opblock-summary-path,
        .swagger-ui .opblock-summary-description {
          color: #ffffff !important;
        }
  
        /* Contenido expandido de los endpoints */
        .swagger-ui .opblock-body,
        .swagger-ui .opblock-description-wrapper,
        .swagger-ui .opblock-section-header {
          background-color: #1a1a1a !important;
          color: #ffffff !important;
        }
  
        .swagger-ui .opblock-section-header h4,
        .swagger-ui .opblock-section-header label {
          color: #ffffff !important;
        }
  
        /* Parámetros */
        .swagger-ui .parameter__name,
        .swagger-ui .parameter__type,
        .swagger-ui .parameter__deprecated,
        .swagger-ui .parameter__in {
          color: #ffffff !important;
        }
  
        .swagger-ui .parameter__extension,
        .swagger-ui .parameter__example {
          color: #cccccc !important;
        }
  
        /* Tablas */
        .swagger-ui table,
        .swagger-ui table thead tr th,
        .swagger-ui table tbody tr td {
          background-color: #2a2a2a !important;
          color: #ffffff !important;
          border-color: #3a3a3a !important;
        }
  
        .swagger-ui .model-box {
          background-color: #2a2a2a !important;
          color: #ffffff !important;
        }
  
        /* Inputs y controles */
        .swagger-ui input[type=text],
        .swagger-ui input[type=password],
        .swagger-ui input[type=email],
        .swagger-ui input[type=number],
        .swagger-ui textarea,
        .swagger-ui select {
          background-color: #2a2a2a !important;
          color: #ffffff !important;
          border: 1px solid #3a3a3a !important;
        }
  
        .swagger-ui input[type=text]:focus,
        .swagger-ui input[type=password]:focus,
        .swagger-ui input[type=email]:focus,
        .swagger-ui input[type=number]:focus,
        .swagger-ui textarea:focus,
        .swagger-ui select:focus {
          border-color: #4a4a4a !important;
          box-shadow: 0 0 0 1px #4a4a4a !important;
        }
  
        /* Botones */
        .swagger-ui .btn {
          background-color: #3a3a3a !important;
          color: #ffffff !important;
          border-color: #4a4a4a !important;
        }
  
        .swagger-ui .btn:hover {
          background-color: #4a4a4a !important;
        }
  
        .swagger-ui .btn.execute {
          background-color: #4a5a2a !important;
          border-color: #5a6a3a !important;
        }
  
        .swagger-ui .btn.execute:hover {
          background-color: #5a6a3a !important;
        }
  
        .swagger-ui .btn.cancel {
          background-color: #5a2a2a !important;
          border-color: #6a3a3a !important;
        }
  
        .swagger-ui .btn.cancel:hover {
          background-color: #6a3a3a !important;
        }
  
        /* Respuestas */
        .swagger-ui .response-col_status,
        .swagger-ui .response-col_description {
          color: #ffffff !important;
        }
  
        .swagger-ui .responses-inner h4,
        .swagger-ui .responses-inner h5 {
          color: #ffffff !important;
        }
  
        /* Código de respuesta */
        .swagger-ui .highlight-code {
          background-color: #2a2a2a !important;
        }
  
        .swagger-ui .highlight-code .microlight {
          color: #ffffff !important;
        }
  
        /* Modelos */
        .swagger-ui .model {
          background-color: #2a2a2a !important;
          color: #ffffff !important;
        }
  
        .swagger-ui .model-title {
          color: #ffffff !important;
        }
  
        .swagger-ui .prop-type {
          color: #cccccc !important;
        }
  
        .swagger-ui .prop-format {
          color: #aaaaaa !important;
        }
  
        /* Try it out */
        .swagger-ui .try-out {
          background-color: #2a2a2a !important;
          color: #ffffff !important;
        }
  
        /* Curl command */
        .swagger-ui .curl-command {
          background-color: #2a2a2a !important;
          color: #ffffff !important;
        }
  
        /* Scrollbars */
        .swagger-ui ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
  
        .swagger-ui ::-webkit-scrollbar-track {
          background: #2a2a2a !important;
        }
  
        .swagger-ui ::-webkit-scrollbar-thumb {
          background: #4a4a4a !important;
          border-radius: 4px;
        }
  
        .swagger-ui ::-webkit-scrollbar-thumb:hover {
          background: #5a5a5a !important;
        }
  
        /* Links */
        .swagger-ui a {
          color: #66b3ff !important;
        }
  
        .swagger-ui a:hover {
          color: #99ccff !important;
        }
  
        /* Autorización */
        .swagger-ui .auth-wrapper {
          background-color: #2a2a2a !important;
          color: #ffffff !important;
        }
  
        .swagger-ui .auth-container {
          background-color: #2a2a2a !important;
          border-color: #3a3a3a !important;
        }
  
        /* Dialogs */
        .swagger-ui .dialog-ux {
          background-color: #2a2a2a !important;
          color: #ffffff !important;
        }
  
        .swagger-ui .modal-ux {
          background-color: #2a2a2a !important;
          color: #ffffff !important;
        }
  
        /* JSON Schema */
        .swagger-ui .json-schema-form {
          background-color: #2a2a2a !important;
          color: #ffffff !important;
        }
  
        /* Dropdown */
        .swagger-ui select option {
          background-color: #2a2a2a !important;
          color: #ffffff !important;
        }
  
        /* Headers */
        .swagger-ui h1, .swagger-ui h2, .swagger-ui h3, .swagger-ui h4, .swagger-ui h5, .swagger-ui h6 {
          color: #ffffff !important;
        }
  
        /* Placeholders */
        .swagger-ui input::placeholder,
        .swagger-ui textarea::placeholder {
          color: #888888 !important;
        }
  
        /* Border radius para un look más moderno */
        .swagger-ui .opblock,
        .swagger-ui .btn,
        .swagger-ui input,
        .swagger-ui textarea,
        .swagger-ui select {
          border-radius: 6px !important;
        }
      `,
      customSiteTitle: 'Swagger API - Dark Theme'
    };

export default swaggerOptions;