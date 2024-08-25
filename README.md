# Prueba técnica Gabriel

1.  Clonar el repositorio
2.  Instalar dependencias con `npm install`
3.  Se debe crear una base de datos postgresql para posteriormente llenar la variable de entorno DATABASE_URL
4.  Colocar las variables de entorno correspondientes creando un archivo .env generar las APIKEY de sus correspondientes sitios en la raíz del proyecto el cual debe contener las siguientes variables de entorno

    ```
    DATABASE_URL=postgres://postgres:{contraseña}@localhost:5432/{nombre de la base de datos}
    NEXTAUTH_SECRET={APIKEY_NEXTAUTH_SECRET}
    NEXTAUTH_URL=http://localhost:3000
    GOOGLE_CLIENT_ID={APIKEY_GOOGLE_CLIENT_ID}
    GOOGLE_CLIENT_SECRET={APIKEY_GOOGLE_CLIENT_SECRET}
    RESEND_API_KEY={APIKEY_RESEND_API_KEY}
    ``

    ```

5.  Ejecutar

`npm db:generate ` y luego ` npm db:migrate` para generar las tablas de base de datos

6.  Iniciar el servidor con `npm run dev`

## Documentación de los requerimientos mínimos

1.  La autenticación fue realizada siguiendo los requerimientos de este punto, se implementó la funcionalidad de que el usuario pueda iniciar sesión a través de su correo eléctronico al hacer click sobre la barra superior en el botón de login, se redirigirá al usuario a una ventana en la cual haciendo click puede iniciar sesión a través de su cuenta de Gmail, con esto el usuario iniciará sesión y se creará y registrará un usuario en la base de datos con PostgreSql. También el registro de un usuario puede hacerse haciendo uso del formulario mostrado en la pantalla de inicio, esto persistirá un usuario en la base de datos. Para el cerrado de sesión de forma segura se implementó un componente Avatar en la barra de navegación superior, mediante el cual al hacer click desplegará un menú que contiene la opción Sign Out o cerrar sesión, al hacer click sobre ella, la sesión se cerrará de forma segura.

![Boton de inicio de sesión](https://github.com/user-attachments/assets/e2b7522a-93a7-4d7d-b9b7-cdd28ba413d3) imagen para botón para el inicio de sesión

!![image](https://github.com/user-attachments/assets/156965b5-7473-4a87-bad2-27a9e303649a)

Imagen del avatar del usuario

![image](https://github.com/user-attachments/assets/4802e6a8-afd8-4d1c-b5d4-198f0d42d474)
Botón cierre de sesión del avatar

2.  Los datos son persisitidos en una base de datos PostgreSQL y utilizando el ORM Prisma, se les permite a los usuarios agregar información personal, haciendo click sobre la opción record y posteriormente en el boton + se pueden añadir registros, Al hacer click en este ícono se abrirá un modal en el cual se podrán ingresar las entradas de información personal como se muestra en la siguiente imagen tomando en cuenta el **punto 3 de los requerimientos mínimos solicitados** , se implementó una validación de los datos a ser ingresados, se verifica que la cédula sea un número válido,que el salario sea un número positivo, y que los campos obligatorios no se encuentren vacíos como se muestra en la siguiente imagen, dichas validaciones se hicieron utilizando Zod para la validación de los schemas.
    Se creó de acuerdo a lo solicitado y accesible a través de la opción reports en la barra superior, en la cual se muestra una pantalla con el salario promedio de todos los registros ingresados y el top 5 de los mejores salarios registrados por el usuario, para ello se implementaron dos funciones asíncronas en forma de API calculateAverageSalary y createSalaryReport
    ![image](https://github.com/user-attachments/assets/2accde7b-9eec-4af3-b2ee-af2b400005e2)
    Botón para agregar más registros de información personal

campos con validaciones al agregar un registro de información personal
![image](https://github.com/user-attachments/assets/7d246108-3ffc-4076-a5ae-9a977d5c14e8)

Reporte de salarios promedios y top 5 de los mejores salarios
![image](https://github.com/user-attachments/assets/6fa097a6-7617-4dcd-8820-642828d8c349)

3.  punto 3 de los requerimientos mínimos solicitados descritos en el párrafo anterior

4.  Para la presentación de los datos almacenados en la base de datos, dicha capacidad se habilitó en la opción Reports de la barra superior, al hacer click se mostrará un datatable que mostrará todos los registros de información personal agregados por el usuario, se pueden ordenar las entradas por nombre u otras columnas mostradas en el datatable y finalmente se implementó una barra de búsqueda funcional la cual permite realizar la búsqueda filtrando por cada columna disponible la cual puede ser seleccionada e ingresando en el input el dato para realizar la búsqueda

    ![image](https://github.com/user-attachments/assets/29c16645-07f8-4f49-a21d-442f3ca47e43)

    filtrado por cedula en el data table
    ![image](https://github.com/user-attachments/assets/97019555-3f05-425d-8963-0da1f0a1043f)

    filtrado por nombre
    ![image](https://github.com/user-attachments/assets/07fce85e-0bb7-4926-b2fd-261d309a432d)

5.  Me aseguré de que no hubieran errores en el build :thumbsup:, hice un deploy funcional de la aplicación utilizando vercel y accesible a través de https://parkour-dev-test.vercel.app/

![image](https://github.com/user-attachments/assets/63d53575-cfb6-4bbc-88c6-c6ce3f2c7aca)

### En cuanto a los requerimientos opcionales

1. Implementé la internacionalización utilizando la librería _react-intl_ , el cambio de lenguaje se puede hacer haciendo click sobre el select y seleccionando el idioma deseado
   ![image](https://github.com/user-attachments/assets/c0bed3ce-eadb-4a8b-9a12-faec8263a5e1)

2. Se implementó el envío de correos con Resend y React-email, se accede a dicha página al darle click a la opción Confirm Email, se muestra un formulario en el cual el usuario debe ingresar su correo en el formulario, dar click a sendEmail y se enviará un correo haciendo uso de Resend y un template de react-email el cual contiene una URL con un token de verificación, al usuario abrir el correo e ingresar a dicho link se ejecuta una función que verifica el token y se procede a actualizar el campo EmailVerified del usuario en la base de datos, es importante destacar la limitación que presenta resend en su formato gratuito en el cual me registré para obtener la APIKEY de resend, por la cual solamente se permite enviar correos al campo registrado para generar la APIKEY es decir solamente se enviarán correos al correo usado para generar la APIKEY en RESEND

![image](https://github.com/user-attachments/assets/312c5841-5c0d-4159-aa5e-5cbd43a2a6d8)

![image](https://github.com/user-attachments/assets/aa2b3028-d57b-4388-90e5-2211743959ca)

![image](https://github.com/user-attachments/assets/10d3ee70-6e73-424b-92c3-15764a9199cf)

![image](https://github.com/user-attachments/assets/c884a89f-60d6-46e7-a06f-a8f5293c1ec0)
