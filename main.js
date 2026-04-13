"use strict";
class AutomataCalculator {
    /*
     * PRESENTATION SCRIPT - TECHNICAL DEEP-DIVE: DIVISION ALGORITHM
     *
     * [Introduction]
     * In this section of our TypeScript architecture, we implement the divisionAlgorithm function. It returns a DivisionResult interface containing dividend, divisor, quotient, remainder, and the formatted equation.
     *
     * [Process]
     * Given any two parameters, the system leverages Math.max and Math.min logic to deduce the dividend and divisor regardless of parameter order, strictly enforcing the requirement that the highest number becomes the dividend.
     *
     * [Instruction/Method to Results]
     * The mathematical quotient is extracted via Math.floor(dividend / divisor). The remainder is securely identified utilizing the core modulo operator (%). These derived variables populate a template literal string matching the mathematical sequence "m = n(q) + r".
     */
    static divisionAlgorithm(num1, num2) {
        const dividend = Math.max(num1, num2);
        const divisor = Math.min(num1, num2);
        let quotient = 0;
        let remainder = dividend;
        quotient = Math.floor(dividend / divisor);
        remainder = dividend % divisor;
        return {
            dividend,
            divisor,
            quotient,
            remainder,
            equation: `${dividend.toLocaleString()} = ${divisor.toLocaleString()}(${quotient.toLocaleString()}) + ${remainder.toLocaleString()}`
        };
    }
    /*
     * PRESENTATION SCRIPT - TECHNICAL DEEP-DIVE: EUCLIDEAN ALGORITHM
     *
     * [Introduction]
     * Proceeding to the euclideanAlgorithm logic block. This securely executes the Greatest Common Divisor and Least Common Multiple processing loop, returning a custom EuclideanResult payload structurally retaining our step-by-step outputs in an array.
     *
     * [Process]
     * We execute a controlled while-loop governed by the boundary constraint: remainder 'n' should never evaluate to zero. Inside each rotation, variables systematically re-assign inputs. The dividend 'm' assumes the state of divisor 'n', whilst 'n' adapts to remainder 'r'.
     *
     * [Instruction/Method to Results]
     * In each iteration hook, string formulas map dynamically and execute push directives into the 'steps' object array recursively. The final cycle item representing the Last Non-Zero Remainder resolves to our GCD parameter. Instantly, an inline arithmetic structure: (original num1 * original num2) / GCD establishes our LCM.
     */
    static euclideanAlgorithm(num1, num2) {
        let m = Math.max(num1, num2);
        let n = Math.min(num1, num2);
        const originalIntegers = [m, n];
        const steps = [];
        let r = -1;
        while (n !== 0) {
            const q = Math.floor(m / n);
            r = m % n;
            steps.push(`• ${m.toLocaleString()} = ${n.toLocaleString()}(${q.toLocaleString()}) + ${r.toLocaleString()}`);
            m = n;
            n = r;
        }
        const gcd = m;
        const lcm = (originalIntegers[0] * originalIntegers[1]) / gcd;
        return {
            originalIntegers,
            steps,
            gcd,
            lcm
        };
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const divForm = document.getElementById("div-algo-form");
    const divInput1 = document.getElementById("div-input-1");
    const divInput2 = document.getElementById("div-input-2");
    const divResults = document.getElementById("div-results");
    const eucForm = document.getElementById("euc-algo-form");
    const eucInput1 = document.getElementById("euc-input-1");
    const eucInput2 = document.getElementById("euc-input-2");
    const eucResults = document.getElementById("euc-results");
    if (divForm) {
        divForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const val1 = parseInt(divInput1.value, 10);
            const val2 = parseInt(divInput2.value, 10);
            if (isNaN(val1) || isNaN(val2) || val1 <= 0 || val2 <= 0) {
                alert("Please enter valid positive integers.");
                return;
            }
            const result = AutomataCalculator.divisionAlgorithm(val1, val2);
            document.getElementById("div-equation").textContent = result.equation;
            document.getElementById("div-dividend").textContent = result.dividend.toLocaleString();
            document.getElementById("div-divisor").textContent = result.divisor.toLocaleString();
            document.getElementById("div-quotient").textContent = result.quotient.toLocaleString();
            document.getElementById("div-remainder").textContent = result.remainder.toLocaleString();
            divResults.classList.remove("hidden");
        });
    }
    if (eucForm) {
        eucForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const val1 = parseInt(eucInput1.value, 10);
            const val2 = parseInt(eucInput2.value, 10);
            if (isNaN(val1) || isNaN(val2) || val1 <= 0 || val2 <= 0) {
                alert("Please enter valid positive integers.");
                return;
            }
            const result = AutomataCalculator.euclideanAlgorithm(val1, val2);
            const stepsContainer = document.getElementById("euc-steps");
            stepsContainer.innerHTML = "";
            result.steps.forEach(step => {
                const stepDiv = document.createElement("div");
                stepDiv.className = "step-item";
                stepDiv.textContent = step;
                stepsContainer.appendChild(stepDiv);
            });
            document.getElementById("euc-original").textContent = `${result.originalIntegers[0].toLocaleString()} and ${result.originalIntegers[1].toLocaleString()}`;
            document.getElementById("euc-gcd").textContent = result.gcd.toLocaleString();
            document.getElementById("euc-lcm").textContent = result.lcm.toLocaleString();
            eucResults.classList.remove("hidden");
        });
    }
});
