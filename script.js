document.addEventListener('DOMContentLoaded', function() {    const calculateBtn = document.getElementById('calculateBtn');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const vacationDaysInput = document.getElementById('vacationDays');
    const vacationInfo = document.getElementById('vacationInfo');
    const vacationMessage = document.getElementById('vacationMessage');
    const timeResult = document.getElementById('timeResult');
    const resultsContainer = document.getElementById('resultsContainer');
    const detailsContainer = document.getElementById('detailsContainer');
    const calculationDetails = document.getElementById('calculationDetails');
    
    // Set default dates for easier testing
    const today = new Date();
    endDateInput.valueAsDate = today;
    
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    startDateInput.valueAsDate = oneYearAgo;
      // Update time worked when dates change
    startDateInput.addEventListener('change', updateTimeWorked);
    endDateInput.addEventListener('change', updateTimeWorked);
    
    // Hide vacation info when user manually changes vacation days
    vacationDaysInput.addEventListener('input', function() {
        if (this.value && this.value !== '0') {
            vacationInfo.style.display = 'none';
        }
    });
    
    // Initial update
    updateTimeWorked();
    
    calculateBtn.addEventListener('click', calculateSettlement);
      function updateTimeWorked() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        
        if (startDate && endDate && startDate < endDate) {
            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const totalYears = diffDays / 365;
            
            const years = Math.floor(diffDays / 365);
            const months = Math.floor((diffDays % 365) / 30);
            const days = Math.floor((diffDays % 365) % 30);
            
            timeResult.innerHTML = `
                <i class="fas fa-clock"></i> Tiempo trabajado: 
                ${years} año${years !== 1 ? 's' : ''}, 
                ${months} mes${months !== 1 ? 'es' : ''}, 
                ${days} día${days !== 1 ? 's' : ''}
                <br><span style="font-size: 0.9em;">(${diffDays} días totales)</span>
            `;
            
            // Calcular días de vacaciones proporcionales si tiene menos de un año
            updateVacationDays(totalYears, months, years);
        } else {
            timeResult.textContent = 'Ingrese fechas válidas (fecha de ingreso anterior a fecha de salida)';
            vacationInfo.style.display = 'none';
        }
    }
    
    function updateVacationDays(totalYears, months, years) {
        // Si tiene menos de un año, calcular días proporcionales automáticamente
        if (totalYears < 1) {
            const proportionalVacationDays = Math.floor(months); // 1 día por mes trabajado (aproximación básica)
            vacationDaysInput.value = proportionalVacationDays;
            
            vacationMessage.textContent = `Calculado automáticamente: ${proportionalVacationDays} días (${months} meses trabajados). Al no completar un año, no pudo disfrutar sus vacaciones.`;
            vacationInfo.style.display = 'block';
        } else {
            // Si tiene un año o más, no calcular automáticamente pero mostrar información
            if (vacationDaysInput.value === '' || vacationDaysInput.value === '0') {
                const estimatedVacationDays = years * 12; // Estimación básica: 12 días por año
                vacationMessage.textContent = `Sugerencia: Con ${years} año${years !== 1 ? 's' : ''} de servicio, podría tener aproximadamente ${estimatedVacationDays} días de vacaciones anuales acumuladas.`;
                vacationInfo.style.display = 'block';
            } else {
                vacationInfo.style.display = 'none';
            }
        }
    }
    
    function calculateSettlement() {
        // Retrieve and validate inputs
        const employeeName = document.getElementById('employeeName').value.trim();
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        const salary = parseFloat(document.getElementById('salary').value) || 0;
        const pendingDays = parseInt(document.getElementById('pendingDays').value) || 0;
        const vacationDays = parseInt(document.getElementById('vacationDays').value) || 0;
        const bonusDays = parseInt(document.getElementById('bonus').value) || 15;
        const terminationType = document.querySelector('input[name="termination"]:checked').value;

        // Input validation
        if (!employeeName) {
            alert('Por favor ingrese el nombre del empleado.');
            return;
        }
        if (!startDate || !endDate || startDate >= endDate) {
            alert('Por favor ingrese fechas válidas. La fecha de ingreso debe ser anterior a la fecha de salida.');
            return;
        }
        if (salary <= 0) {
            alert('Por favor ingrese un salario diario válido y mayor que cero.');
            return;
        }
        if (pendingDays < 0) {
            alert('Los días de salario pendientes no pueden ser negativos.');
            return;
        }
        if (vacationDays < 0) {
            alert('Los días de vacaciones pendientes no pueden ser negativos.');
            return;
        }

        // Calculate time worked
        const diffTime = Math.abs(endDate - startDate);
        const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const totalYears = totalDays / 365;
        
        // Calculate components
        const pendingSalary = pendingDays * salary;
        const vacationPay = vacationDays * salary;
        const vacationPremium = vacationPay * 0.25; // 25% vacation premium

        // Proportional bonus (aguinaldo)
        const currentYearStart = new Date(endDate.getFullYear(), 0, 1);
        const daysWorkedCurrentYear = Math.ceil((endDate - currentYearStart) / (1000 * 60 * 60 * 24));
        const proportionalBonus = (bonusDays * salary) * (daysWorkedCurrentYear / 365);        // Seniority premium (prima de antigüedad) - 12 días por año
        const MINIMUM_WAGE = 248.93; // Salario mínimo general vigente
        const salaryCap = 2 * MINIMUM_WAGE; // Tope de dos salarios mínimos
        const salaryForSeniority = Math.min(salary, salaryCap);
        // La prima de antigüedad solo se paga cuando el trabajador tiene MÁS de 15 años de servicio
        const seniorityPremium = totalYears > 15 ? 12 * salaryForSeniority * totalYears : 0;        // Severance pay (indemnización constitucional) - solo en caso de despido
        let severancePay = 0;
        let basePay = 0;
        let additionalDays = 0;
        let severanceDetails = '';
          if (terminationType === 'dismissal') {
            // 3 meses de salario (siempre se pagan) + 20 días por cada año completado de servicio
            basePay = 3 * 30 * salary; // 90 días base
            
            // Los 20 días se pagan al completar cada año de servicio
            if (totalYears >= 1) {
                // Se pagan 20 días por cada año completo de servicio
                const completedYears = Math.floor(totalYears);
                
                // Más la parte proporcional del año en curso (si aplica)
                const proportionalYear = totalYears - Math.floor(totalYears);
                additionalDays = (completedYears * 20) + (proportionalYear * 20);
                
                severanceDetails = `(90 días base × $${salary.toFixed(2)}) + (${additionalDays.toFixed(2)} días por antigüedad × $${salary.toFixed(2)})`;
            } else {
                // Menos de 1 año: solo días base + proporcional
                const proportionalYear = totalYears;
                additionalDays = proportionalYear * 20;
                severanceDetails = `(90 días base × $${salary.toFixed(2)}) + (${additionalDays.toFixed(2)} días proporcionales × $${salary.toFixed(2)})`;
            }
            
            severancePay = basePay + (additionalDays * salary);
        }

        // Calculate total
        const total = pendingSalary + vacationPay + vacationPremium + proportionalBonus + 
                      seniorityPremium + severancePay;
        
        // Prepare calculation details
        const detailsHtml = `
            <div class="detail-row">
                <span class="detail-label">Salarios pendientes:</span>
                <span class="detail-value">${pendingDays} días × $${salary.toFixed(2)} = $${pendingSalary.toFixed(2)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Vacaciones pendientes:</span>
                <span class="detail-value">${vacationDays} días × $${salary.toFixed(2)} = $${vacationPay.toFixed(2)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Prima vacacional:</span>
                <span class="detail-value">25% de $${vacationPay.toFixed(2)} = $${vacationPremium.toFixed(2)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Aguinaldo proporcional:</span>
                <span class="detail-value">${bonusDays} días × $${salary.toFixed(2)} × (${daysWorkedCurrentYear}/365) = $${proportionalBonus.toFixed(2)}</span>
            </div>
            ${seniorityPremium > 0 ? `
            <div class="detail-row">
                <span class="detail-label">Prima de antigüedad:</span>
                <span class="detail-value">12 días × $${salaryForSeniority.toFixed(2)} × ${totalYears.toFixed(2)} años = $${seniorityPremium.toFixed(2)}</span>
            </div>
            ` : ''}            ${terminationType === 'dismissal' ? `
            <div class="detail-row">
                <span class="detail-label">Indemnización constitucional:</span>
                <span class="detail-value">${severanceDetails} = $${severancePay.toFixed(2)}</span>
            </div>
            ` : ''}
        `;
        
        // Display results
        resultsContainer.innerHTML = `
            <div class="result-item">
                <div class="concept"><i class="fas fa-money-check result-icon"></i> Salarios pendientes (${pendingDays} días):</div>
                <div class="amount">$${pendingSalary.toFixed(2)}</div>
            </div>
            <div class="result-item">
                <div class="concept"><i class="fas fa-umbrella-beach result-icon"></i> Vacaciones no disfrutadas (${vacationDays} días):</div>
                <div class="amount">$${vacationPay.toFixed(2)}</div>
            </div>
            <div class="result-item">
                <div class="concept"><i class="fas fa-gift result-icon"></i> Prima vacacional (25%):</div>
                <div class="amount">$${vacationPremium.toFixed(2)}</div>
            </div>
            <div class="result-item">
                <div class="concept"><i class="fas fa-tree result-icon"></i> Aguinaldo proporcional:</div>
                <div class="amount">$${proportionalBonus.toFixed(2)}</div>
            </div>
            ${seniorityPremium > 0 ? `
            <div class="result-item">
                <div class="concept"><i class="fas fa-award result-icon"></i> Prima de antigüedad:</div>
                <div class="amount">$${seniorityPremium.toFixed(2)}</div>
            </div>
            ` : ''}
            ${terminationType === 'dismissal' ? `
            <div class="result-item">
                <div class="concept"><i class="fas fa-balance-scale result-icon"></i> Indemnización constitucional:</div>
                <div class="amount">$${severancePay.toFixed(2)}</div>
            </div>
            ` : ''}
            <div class="result-item total">
                <div class="concept"><i class="fas fa-file-invoice-dollar"></i> TOTAL A PAGAR:</div>
                <div class="amount">$${total.toFixed(2)}</div>
            </div>
            <div style="margin-top: 20px; padding: 15px; background-color: #e8f4f8; border-radius: 5px;">
                <p><strong>Tipo de cálculo:</strong> ${terminationType === 'dismissal' ? 'Liquidación por despido' : 'Finiquito por renuncia'}</p>
                <p style="margin-top: 10px; font-size: 0.9em;">
                    <i class="fas fa-info-circle"></i> ${terminationType === 'dismissal' ? 
                    'Incluye indemnización constitucional' : 
                    'No incluye indemnización por ser renuncia voluntaria'}
                </p>
            </div>
            <div class="toggle-details" id="toggleDetails">
                <i class="fas fa-chevron-down"></i> Ver detalles del cálculo
            </div>
        `;
        
        // Insert calculation details
        calculationDetails.innerHTML = detailsHtml;
        detailsContainer.style.display = 'block';
        
        // Add event listener for toggle details
        document.getElementById('toggleDetails').addEventListener('click', function() {
            const details = document.getElementById('detailsContainer');
            const icon = this.querySelector('i');
            
            if (details.style.display === 'none') {
                details.style.display = 'block';
                icon.className = 'fas fa-chevron-up';
                this.innerHTML = '<i class="fas fa-chevron-up"></i> Ocultar detalles';
            } else {
                details.style.display = 'none';
                icon.className = 'fas fa-chevron-down';
                this.innerHTML = '<i class="fas fa-chevron-down"></i> Ver detalles del cálculo';
            }
        });
    }
});
