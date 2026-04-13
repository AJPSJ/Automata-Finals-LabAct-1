interface DivisionResult {
    dividend: number;
    divisor: number;
    quotient: number;
    remainder: number;
    equation: string;
}

interface EuclideanResult {
    originalIntegers: [number, number];
    steps: string[];
    gcd: number;
    lcm: number;
}

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
    static divisionAlgorithm(num1: number, num2: number): DivisionResult {
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
            equation: `${dividend} = ${divisor}(${quotient}) + ${remainder}`
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
    static euclideanAlgorithm(num1: number, num2: number): EuclideanResult {
        let m = Math.max(num1, num2);
        let n = Math.min(num1, num2);
        
        const originalIntegers: [number, number] = [m, n];
        const steps: string[] = [];
        
        let r = -1;
        let stepCount = 1;
        
        while (n !== 0) {
            const q = Math.floor(m / n);
            r = m % n;
            
            steps.push(`${stepCount}. ${m} = ${n}(${q}) + ${r}`);
            
            m = n;
            n = r;
            stepCount++;
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
    const divForm = document.getElementById("div-algo-form") as HTMLFormElement;
    const divInput1 = document.getElementById("div-input-1") as HTMLInputElement;
    const divInput2 = document.getElementById("div-input-2") as HTMLInputElement;
    const divResults = document.getElementById("div-results") as HTMLDivElement;
    
    const eucForm = document.getElementById("euc-algo-form") as HTMLFormElement;
    const eucInput1 = document.getElementById("euc-input-1") as HTMLInputElement;
    const eucInput2 = document.getElementById("euc-input-2") as HTMLInputElement;
    const eucResults = document.getElementById("euc-results") as HTMLDivElement;

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
            
            document.getElementById("div-equation")!.textContent = result.equation;
            document.getElementById("div-dividend")!.textContent = result.dividend.toString();
            document.getElementById("div-divisor")!.textContent = result.divisor.toString();
            document.getElementById("div-quotient")!.textContent = result.quotient.toString();
            document.getElementById("div-remainder")!.textContent = result.remainder.toString();
            
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
            
            const stepsContainer = document.getElementById("euc-steps")!;
            stepsContainer.innerHTML = "";
            result.steps.forEach(step => {
                const stepDiv = document.createElement("div");
                stepDiv.className = "step-item";
                stepDiv.textContent = step;
                stepsContainer.appendChild(stepDiv);
            });

            document.getElementById("euc-original")!.textContent = `${result.originalIntegers[0]} and ${result.originalIntegers[1]}`;
            document.getElementById("euc-gcd")!.textContent = result.gcd.toString();
            document.getElementById("euc-lcm")!.textContent = result.lcm.toString();
            
            eucResults.classList.remove("hidden");
        });
    }
});
