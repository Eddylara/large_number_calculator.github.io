// Elementos del DOM
let $numA = document.getElementById("text_area_A");
let $numB = document.getElementById("text_area_B");
let $ir_boton = document.getElementById("calc_btn");
let $message_e = document.getElementById("message_error");
let $msj_result = document.getElementById("resultado");

// Función para validar el contenido de los textarea
function validateInputs() {
  // Verificar si los valores son números válidos
  const isNumAValid = !isNaN($numA.value) && $numA.value.trim() !== "";
  const isNumBValid = !isNaN($numB.value) && $numB.value.trim() !== "";

  // Si ambos campos están vacíos, deshabilitar el botón y limpiar clases de error
  if ($numA.value.trim() === "" && $numB.value.trim() === "") {
    $ir_boton.disabled = true; // Deshabilitar botón
    $numA.classList.remove("error_text-area");
    $numB.classList.remove("error_text-area");
    $message_e.classList.add("desaparecer"); // Ocultar mensaje de error
    return;
  }

  // Si ambos valores son válidos
  if (isNumAValid && isNumBValid) {
    $ir_boton.disabled = false; // Habilitar botón
    $numA.classList.remove("error_text-area");
    $numB.classList.remove("error_text-area");
    $message_e.classList.add("desaparecer"); // Ocultar mensaje de error
  } else {
    // Alguno o ambos tienen valores no válidos
    $ir_boton.disabled = true; // Deshabilitar botón

    // Validar $numA
    if (!isNumAValid && $numA.value.trim() !== "") {
      $numA.classList.add("error_text-area");
    } else {
      $numA.classList.remove("error_text-area");
    }

    // Validar $numB
    if (!isNumBValid && $numB.value.trim() !== "") {
      $numB.classList.add("error_text-area");
    } else {
      $numB.classList.remove("error_text-area");
    }

    // Mostrar mensaje de error si algún campo tiene valor inválido
    $message_e.classList.remove("desaparecer");
  }
}

// Agregar eventos para detectar cambios en los textarea
$numA.addEventListener("input", validateInputs);
$numB.addEventListener("input", validateInputs);
$ir_boton.addEventListener("click", () => {
  let resultado = multiplicarKaratsuba($numA.value, $numB.value);
  $msj_result.classList.remove("desaparecer");
  $msj_result.innerHTML = `Su resultado es: <span class="number_result">${resultado}</span>`;
  console.log(resultado);
});

// Función para mostrar el resultado en la página
function mostrarResultado(num1, num2) {
  // Llamar a la función de Karatsuba para calcular el resultado
  const resultado = multiplicarKaratsuba(num1, num2);

  // Mostrar el resultado en el contenedor de resultados
  document.getElementById("resultado").classList.remove("desaparecer");
  document.querySelector(".number_result").textContent = resultado;
}

// Obtener todos los botones y la pantalla
const botones = document.querySelectorAll(".prime_btn");
const screen = document.querySelector(".screen");

// Función para cambiar el contenido de la pantalla y el estado de los botones
function cambiarContenidoBotones() {
  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      // Remover la clase 'prime_btn_activo' de todos los botones
      botones.forEach((btn) => btn.classList.remove("prime_btn_activo"));

      // Añadir la clase 'prime_btn_activo' al botón que fue presionado
      boton.classList.add("prime_btn_activo");

      // Actualizar el contenido de la pantalla según el botón presionado
      if (boton.textContent === "Info") {
        screen.innerHTML = `<div class="screen_ayuda">
                    <h2>¿Qué es Karatsuba?</h2>
                    <p>
                        Esta herramienta utiliza el algoritmo de Karatsuba para multiplicar números grandes de forma
                        eficiente. En lugar de
                        multiplicar directamente, el algoritmo divide los números en partes más pequeñas, lo que permite
                        realizar la
                        operación en menos pasos y con menor tiempo de cálculo.
                    </p>
                    <p>
                        Solo necesitas ingresar los dos números que deseas multiplicar y presionar "IR". El algoritmo
                        hará el resto y
                        mostrará el resultado de la multiplicación.
                    </p>

                    <div class="about_me">
                        <div>
                            <img src="assets/img/utb-logotipo_page_mini.png" class="logo">
                        </div>

                        <div class="der_me">
                            <h4>Universidad Técnologica de Bolívar</h4>
                            <h5 style="margin-bottom: 3px;">Estructuras de Datos - 2024</h5>
                            <p>Eddy L. - T00078973</p>
                            <p>David P. - T00079273</p>
                            <p>Jose P. - T00079768</p>
                            <p>Juan C. - T00068444</p>
                        </div>
                    </div>
                </div>`;
      } else if (boton.textContent === "Ayuda") {
        screen.innerHTML = `<div class="screen_ayuda">


                    <h2>¿Cómo usar esta herramienta?</h2>
                    <p>
                        Para multiplicar dos números grandes utilizando el algoritmo de Karatsuba, sigue estos pasos:
                    </p>
                    <ul>
                        <li><strong>Ingresa el primer número:</strong> Escribe el primer número grande en el primer
                            recuadro.</li>
                        <li><strong>Ingresa el segundo número:</strong> Escribe el segundo número grande en el segundo
                            recuadro.</li>
                        <li><strong>Presiona "Ir":</strong> Haz clic en el botón "IR" para iniciar el cálculo de la
                            multiplicación.</li>
                        <li><strong>Ver el resultado:</strong> El resultado de la multiplicación aparecerá debajo de los
                            campos de entrada.
                        </li>
                    </ul>
                    <p>
                        Asegúrate de que los números sean introducidos correctamente en los recuadros. Si tu entrada es
                        inválida, un mensaje
                        de error se mostrará para ayudarte a corregirla.
                    </p>
                </div>`;
      } else if (boton.textContent === "Ejemplos") {
        screen.innerHTML = `<div class="ejemplos_container">
                    <div class="ejemplo" id="ejemplo_1">Ejemplo 1</div>
                    <div class="ejemplo" id="ejemplo_2">Ejemplo 2</div>
                    <div class="ejemplo" id="ejemplo_3">Ejemplo 3</div>
                </div>`;

        document
          .getElementById("ejemplo_1")
          .addEventListener("click", function () {
            const num1 = "123456789123456789"; // Primer número del Ejemplo 1
            const num2 = "987654321987654321"; // Segundo número del Ejemplo 1
            mostrarResultado(num1, num2);
            // Asignar los valores a los textareas
            document.getElementById("text_area_A").value = num1;
            document.getElementById("text_area_B").value = num2;
          });

        document
          .getElementById("ejemplo_2")
          .addEventListener("click", function () {
            const num1 = "234567890123456789"; // Primer número del Ejemplo 2
            const num2 = "876543210987654321"; // Segundo número del Ejemplo 2
            mostrarResultado(num1, num2);
            // Asignar los valores a los textareas
            document.getElementById("text_area_A").value = num1;
            document.getElementById("text_area_B").value = num2;
          });

        document
          .getElementById("ejemplo_3")
          .addEventListener("click", function () {
            const num1 = "345678901234567890"; // Primer número del Ejemplo 3
            const num2 = "765432109876543210"; // Segundo número del Ejemplo 3
            mostrarResultado(num1, num2);
            // Asignar los valores a los textareas
            document.getElementById("text_area_A").value = num1;
            document.getElementById("text_area_B").value = num2;
          });
      }
    });
  });
}

// Llamamos a la función para que se ejecute cuando el script se cargue
cambiarContenidoBotones();

function multiplicarKaratsuba(num1, num2) {
  // Eliminar los puntos decimales y contar cuántos hay en cada número
  const decimalPos1 = num1.indexOf(".");
  const decimalPos2 = num2.indexOf(".");

  let decimales1 = 0;
  let decimales2 = 0;

  if (decimalPos1 !== -1) {
    decimales1 = num1.length - decimalPos1 - 1; // Contar los decimales en num1
    num1 = num1.replace(".", ""); // Eliminar el punto decimal
  }

  if (decimalPos2 !== -1) {
    decimales2 = num2.length - decimalPos2 - 1; // Contar los decimales en num2
    num2 = num2.replace(".", ""); // Eliminar el punto decimal
  }

  // Caso base: si los números son suficientemente pequeños, usar BigInt para multiplicarlos directamente
  if (num1.length <= 10 && num2.length <= 10) {
    const resultado = BigInt(num1) * BigInt(num2);
    return resultado.toString();
  }

  // Asegurar que ambos números tengan la misma longitud rellenando con ceros al inicio
  const longitudMaxima = Math.max(num1.length, num2.length);
  num1 = num1.padStart(longitudMaxima, "0");
  num2 = num2.padStart(longitudMaxima, "0");

  // Dividir los números a la mitad
  const mitad = Math.floor(longitudMaxima / 2);

  // Separar en partes alta (izquierda) y baja (derecha)
  const parteAlta1 = num1.slice(0, -mitad); // Parte alta del primer número
  const parteBaja1 = num1.slice(-mitad); // Parte baja del primer número
  const parteAlta2 = num2.slice(0, -mitad); // Parte alta del segundo número
  const parteBaja2 = num2.slice(-mitad); // Parte baja del segundo número

  // Llamadas recursivas para calcular las tres multiplicaciones necesarias
  const z0 = multiplicarKaratsuba(parteBaja1, parteBaja2); // Producto de las partes bajas
  const suma1 = (BigInt(parteBaja1) + BigInt(parteAlta1)).toString();
  const suma2 = (BigInt(parteBaja2) + BigInt(parteAlta2)).toString();
  const z1 = multiplicarKaratsuba(suma1, suma2); // Producto de las sumas de las partes altas y bajas
  const z2 = multiplicarKaratsuba(parteAlta1, parteAlta2); // Producto de las partes altas

  // Combinar los resultados usando la fórmula de Karatsuba
  let resultado =
    BigInt(z2) * BigInt(`1${"0".repeat(2 * mitad)}`) + // z2 * 10^(2m)
    (BigInt(z1) - BigInt(z2) - BigInt(z0)) * BigInt(`1${"0".repeat(mitad)}`) + // (z1 - z2 - z0) * 10^m
    BigInt(z0); // z0

  // Ajustar la posición del punto decimal
  const totalDecimales = decimales1 + decimales2;
  resultado = resultado.toString();
  if (totalDecimales > 0) {
    // Insertar el punto decimal en la posición correcta
    resultado =
      resultado.slice(0, resultado.length - totalDecimales) +
      "." +
      resultado.slice(resultado.length - totalDecimales);
  }

  return resultado;
}
