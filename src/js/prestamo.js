class Prestamo {
    constructor(valorCredito, tasa, cantidadCuotas) {
        this.valorCredito = valorCredito;
        this.tasa = tasa;
        this.cantidadCuotas = cantidadCuotas;
    }

    calcularPrestamo(valorCredito, tasa, cantidadCuotas) {
        const amortizaciones = [];
        
        for(let indiceCuotaAnterior = 0; indiceCuotaAnterior < cantidadCuotas; indiceCuotaAnterior++) {
            const amortizacion = this.calcularAmortizacion(valorCredito, cantidadCuotas, indiceCuotaAnterior, tasa);
            amortizaciones.push(amortizacion);
        }
    
        return amortizaciones;
    }
    
    
    calcularAmortizacion(valorCredito, cantidadCuotas, indiceCuotaAnterior, tasa) {
        const abonoCapital = this.calcularAbonoCapital(valorCredito, cantidadCuotas);
        const saldoFinalCuotaAnterior = this.calcularValorPagadoHastaCuotaAnterior(abonoCapital, indiceCuotaAnterior);
        const saldoInicial = this.calcularSaldoInicial(valorCredito, saldoFinalCuotaAnterior);
        const valorInteres = saldoInicial * (tasa/100);
        const valorCuota = abonoCapital + valorInteres;
        const saldoFinal = saldoInicial - abonoCapital;
        const amortizacion = { saldoInicial, valorCuota, valorInteres, abonoCapital, saldoFinal };
        return amortizacion;
    }
    
    calcularSaldoInicial(valorCredito, saldoFinalCuotaAnterior) {
        return valorCredito - saldoFinalCuotaAnterior;
    }
    
    calcularValorPagadoHastaCuotaAnterior(abonoCapital, indiceCuotaAnterior) {
        return abonoCapital * indiceCuotaAnterior;
    }
    
    calcularAbonoCapital(valorCredito, cantidadCuotas) {
        return valorCredito / cantidadCuotas;
    }
}

export { Prestamo };