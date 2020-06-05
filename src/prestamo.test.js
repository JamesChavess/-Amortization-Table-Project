let Prestamo = require('./src/js/prestamo');

describe("cálculo de las tablas de amortización ", ()=> {

    it("cuando pido un préstamos sin intereses y a una cuota el valorCuota será igual al valorCredito", ()=>{
        const valorCredito = 100000;
        const tasa = 0;
        const cantidadCuotas = 1;

        const prestamo = new Prestamo(valorCredito, tasa, cantidadCuotas);
        const arreglo = prestamo.calcularPrestamo(valorCredito, tasa, cantidadCuotas);
       
        expect(arreglo.amortizaciones[0].valorCuota).toBe(valorCredito);
    });

    it("cuando pido un préstamo con interes y a una cuota, el valorCuota será igual al valorCredito mas intereses", ()=>{
        const valorCredito = 100000;
        const tasa = 0.01;
        const cantidadCuotas = 1;
        const prestamo = new Prestamo(valorCredito, tasa, cantidadCuotas);
        const arreglo = prestamo.calcularPrestamo(valorCredito, tasa, cantidadCuotas);

        
        expect(arreglo.amortizaciones.length).toBe(1);
        expect(arreglo.amortizaciones[0].valorCuota).toBe(101000);
        expect(arreglo.amortizaciones[0].valorInteres).toBe(1000);
        expect(arreglo.amortizaciones[0].abonoCapital).toBe(100000);
        expect(arreglo.amortizaciones[0].saldoInicial).toBe(100000);
        expect(arreglo.amortizaciones[0].saldoFinal).toBe(0);
    });

    it("cuando pido un préstamos con interes, a dos cuotas, debe calcular dos amortizaciones con abonos a capital iguales ", () => {
        const valorCredito = 100000;
        const tasa = 0.01;
        const cantidadCuotas = 2;
        const prestamo = new Prestamo(valorCredito, tasa, cantidadCuotas);
        const arreglo = prestamo.calcularPrestamo(valorCredito, tasa, cantidadCuotas);

        expect(arreglo.amortizaciones.length).toBe(2);
        const amortizacion1Esperada = { saldoInicial: 100000, valorCuota:51000, valorInteres:1000, abonoCapital:50000, saldoFinal:50000 };
        expect(arreglo.amortizaciones[0]).toEqual(amortizacion1Esperada)


        acertarAmortizacion(arreglo.amortizaciones[0], 51000, 1000, 50000, 100000, 50000);
        acertarAmortizacion(arreglo.amortizaciones[1], 50500, 500, 50000, 50000, 0);
    });
});

function acertarAmortizacion(amortizacion, valorCuotaEsperado, valorInteresEsperado, abonoCapitalEsperado,saldoInicialESperado, saldoFinalEsperado) {
    expect(amortizacion.valorCuota).toBe(valorCuotaEsperado);
    expect(amortizacion.valorInteres).toBe(valorInteresEsperado);
    expect(amortizacion.abonoCapital).toBe(abonoCapitalEsperado);
    expect(amortizacion.saldoInicial).toBe(saldoInicialESperado);
    expect(amortizacion.saldoFinal).toBe(saldoFinalEsperado);
}