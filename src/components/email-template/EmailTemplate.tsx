import * as React from 'react';

interface EmailTemplateProps {
  name?: string;
  lastname?: string
  phone?: string;
  email?: string;
  brand?: string;
  locality?: string;
  service?: string;
  consultation?: string;

}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  phone,
  locality,
  consultation,
  service,
  email,
  brand,
  lastname
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f9f9f9' }}>

    <h2 style={{ color: '#333' }}>Hola, {name}!</h2>
    <p>Hemos recibido tu consulta con los siguientes detalles:</p>

    <div style={{ marginBottom: '20px' }}>

      {/* otros formularios me envian nombre y apellido en el mismo formulario */}
      {!lastname && <p><strong>Nombre y apellido:</strong> {name}</p>}

      {/* formulario de contacto general me envia nomrbe y apellido por separado */}
      {lastname && <p><strong>Nombre y apellido:</strong> {name} {lastname}</p>}
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Teléfono:</strong> {phone}</p>
      {
        brand && <p><strong>Marca:</strong> {brand}</p>
      }
      {
        locality && <p><strong>Localidad:</strong> {locality}</p>
      }
      <p><strong>Servicio:</strong> {service}</p>
      <p><strong>Consulta:</strong> {consultation}</p>

    </div>

    <hr style={{ border: '1px solid #e0e0e0', margin: '20px 0' }} />



    <p>Nos pondremos en contacto contigo a la brevedad. ¡Gracias por elegirnos!</p>

    {/* Footer */}
    <footer style={{
      backgroundColor: '#191d30',
      color: '#fff',
      padding: '20px',
      textAlign: 'center',
      borderRadius: '5px',
      marginTop: '30px',
    }}>
      <p style={{ margin: 0 }}>© {new Date().getFullYear()} Avec. Todos los derechos reservados.</p>
      <p style={{ fontSize: '12px' }}>Visítanos en <a href="https://avec.com.ar" style={{ color: '#fff', textDecoration: 'underline' }}>www.avec.com.ar</a></p>

    </footer>





  </div>
);