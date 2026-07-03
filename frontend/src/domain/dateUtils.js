/**
 * Convierte un string "YYYY-MM-DD" (como los que guarda la base de datos)
 * en un objeto Date usando la ZONA HORARIA LOCAL, no UTC.
 *
 * Por qué existe: new Date("2026-07-03") lo interpreta el navegador como
 * medianoche en UTC, lo que en Colombia (UTC-5) puede "correrse" al día
 * anterior al mostrarlo. Esta función arma la fecha manualmente con
 * año/mes/día para evitar ese desfase.
 */
export function parseLocalDate(dateString) {
    if (!dateString) return null;

    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // month es 0-indexado en JS
}