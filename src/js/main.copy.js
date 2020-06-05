import { Prestamo } from "./prestamo.js";

class Vista {
  constructor() {
    this.formulario = document.querySelector("#informacionCuota");
    this.formulario.addEventListener("submit", this.tomarDatos);
  }

  tomarDatos(e) {
    e.preventDefault();
    let valorCredito = this.querySelector("#valorCredito").value;
    let tasaInteres = this.querySelector("#tasaInteres").value;
    let cantidadCuotas = this.querySelector("#cantidadCuotas").value;
    console.log(this.valorCredito);
    Vista.prototype.limpiarTabla();
    let prestamo = new Prestamo(valorCredito, tasaInteres, cantidadCuotas);
    const arregloAmortizaciones = prestamo.calcularPrestamo(
      valorCredito,
      tasaInteres,
      cantidadCuotas
    );
    Vista.prototype.pintarTabla(arregloAmortizaciones);
  }

  pintarTabla(amortizaciones) {
    const tabla = document.querySelector("#tablaContenido");
    amortizaciones.forEach((amortizacion, indice) => {
      const fila = document.createElement("tr");

      const columnaNumeroCuota = document.createElement("td");
      columnaNumeroCuota.innerHTML = `${indice + 1}`;
      fila.appendChild(columnaNumeroCuota);

      const columnaSaldoInicial = document.createElement("td");
      columnaSaldoInicial.innerHTML = `${amortizacion.saldoInicial}`;
      fila.appendChild(columnaSaldoInicial);

      const columnaAbonoCapital = document.createElement("td");
      columnaAbonoCapital.innerHTML = `${amortizacion.abonoCapital}`;
      fila.appendChild(columnaAbonoCapital);

      const columnaValorInteres = document.createElement("td");
      columnaValorInteres.innerHTML = `${amortizacion.valorInteres}`;
      fila.appendChild(columnaValorInteres);

      const columnaValorCuota = document.createElement("td");
      columnaValorCuota.innerHTML = `${amortizacion.valorCuota}`;

      fila.appendChild(columnaValorCuota);

      const columnaSaldoFinal = document.createElement("td");
      columnaSaldoFinal.innerHTML = `${amortizacion.saldoFinal}`;
      fila.appendChild(columnaSaldoFinal);

      tabla.appendChild(fila);
        });
    }

    limpiarTabla()  
    {
        const tabla = document.querySelector("#tablaContenido");
        tabla.textContent = "";
  }
}

const vista = new Vista();
