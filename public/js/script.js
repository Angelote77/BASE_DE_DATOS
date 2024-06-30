document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById("updateModal");
    var span = document.getElementsByClassName("close")[0];
    var warningModal = document.getElementById("warningModal");
    var warningMessage = document.getElementById("warningMessage");
    var closeWarning = document.getElementById("closeWarning");

    span.onclick = function() {
        modal.style.display = "none";
    }

    closeWarning.onclick = function() {
        warningModal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        if (event.target == warningModal) {
            warningModal.style.display = "none";
        }
    }

    document.querySelectorAll('.btn-actualizar').forEach(button => {
        button.addEventListener('click', () => {
            if (button.disabled) {
                warningMessage.textContent = "No se puede modificar una cooperativa desactivada.";
                warningModal.style.display = "block";
                return;
            }

            const id = button.getAttribute('data-id');
            const context = button.getAttribute('data-context');

            if (context === 'cooperativa') {
                document.getElementById('update_id').value = id;
                document.getElementById('update_iden').value = button.getAttribute('data-iden');
                document.getElementById('update_nom').value = button.getAttribute('data-nom');
                document.getElementById('update_sig').value = button.getAttribute('data-sig');
                document.getElementById('update_dir').value = button.getAttribute('data-dir');
                document.getElementById('update_tel').value = button.getAttribute('data-tel');
                document.getElementById('update_cor').value = button.getAttribute('data-cor');
                document.getElementById('update_slo').value = button.getAttribute('data-slo');
                document.getElementById('update_usu_rep').value = button.getAttribute('data-usu-rep');

                document.querySelector('#updateModal .modal-content').innerHTML = `
                    <span class="close">&times;</span>
                    <form action="/crud_cooperativa" method="post">
                        <input type="hidden" id="update_id" name="txt_id" value="${id}">
                        <div>
                            <label for="update_iden">Identificador:</label>
                            <input type="text" id="update_iden" name="txt_iden" value="${button.getAttribute('data-iden')}">
                        </div>
                        <div>
                            <label for="update_nom">Nombre:</label>
                            <input type="text" id="update_nom" name="txt_nom" value="${button.getAttribute('data-nom')}">
                        </div>
                        <div>
                            <label for="update_sig">Siglas:</label>
                            <input type="text" id="update_sig" name="txt_sig" value="${button.getAttribute('data-sig')}">
                        </div>
                        <div>
                            <label for="update_dir">Dirección:</label>
                            <input type="text" id="update_dir" name="txt_dir" value="${button.getAttribute('data-dir')}">
                        </div>
                        <div>
                            <label for="update_tel">Teléfono:</label>
                            <input type="text" id="update_tel" name="txt_tel" value="${button.getAttribute('data-tel')}">
                        </div>
                        <div>
                            <label for="update_cor">Correo:</label>
                            <input type="text" id="update_cor" name="txt_cor" value="${button.getAttribute('data-cor')}">
                        </div>
                        <div>
                            <label for="update_slo">Eslogan:</label>
                            <input type="text" id="update_slo" name="txt_slo" value="${button.getAttribute('data-slo')}">
                        </div>
                        <div>
                            <label for="update_usu_rep">Usuario Representante:</label>
                            <input type="text" id="update_usu_rep" name="txt_usu_rep" value="${button.getAttribute('data-usu-rep')}">
                        </div>
                        <button type="submit" id="btm_actualizar" name="btm_actualizar" value="actualizar">Actualizar</button>
                        <button type="button" id="cancelUpdate">Cancelar</button>
                    </form>
                `;
            }

            modal.style.display = "block";

            // Agregar evento para cancelar la actualización
            document.getElementById('cancelUpdate').addEventListener('click', function() {
                modal.style.display = "none";
            });
        });
    });

    document.querySelectorAll('.estado-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            const id = event.target.getAttribute('data-id');
            const context = event.target.getAttribute('data-context');
            const estado = event.target.checked;

            const url = context === 'cooperativa' ? '/crud_cooperativa/estado' : '/crud_usuarios/estado';

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, estado })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Estado actualizado correctamente');
                    if (!estado) {
                        document.querySelector(`button.btn-actualizar[data-id="${id}"]`).disabled = true;
                        document.querySelector(`form[action="/crud_cooperativa"] input[name="txt_id"][value="${id}"]`).nextElementSibling.disabled = true;
                    } else {
                        document.querySelector(`button.btn-actualizar[data-id="${id}"]`).disabled = false;
                        document.querySelector(`form[action="/crud_cooperativa"] input[name="txt_id"][value="${id}"]`).nextElementSibling.disabled = false;
                    }
                } else {
                    console.log('Error al actualizar el estado');
                }
            })
            .catch(error => console.log('Error:', error));
        });
    });

    const crearButton = document.getElementById('btm_crear');
    const crearForm = document.getElementById('crearCooperativaForm');
    const confirmModal = document.getElementById('confirmModal');
    const confirmData = document.getElementById('confirmData');
    const confirmCreate = document.getElementById('confirmCreate');
    const cancelCreate = document.getElementById('cancelCreate');

    const fieldLabels = {
        'txt_iden': 'Identificador',
        'txt_nom': 'Nombre',
        'txt_sig': 'Siglas',
        'txt_dir': 'Dirección',
        'txt_tel': 'Teléfono',
        'txt_cor': 'Correo',
        'txt_slo': 'Eslogan',
        'txt_usu_rep': 'Usuario Representante'
    };

    crearButton.addEventListener('click', function(e) {
        e.preventDefault();
        const formData = new FormData(crearForm);
        let dataHtml = '';
        for (let [key, value] of formData.entries()) {
            if (key !== 'btm_crear') {
                const label = fieldLabels[key] || key;
                dataHtml += `<p><strong>${label}:</strong> ${value}</p>`;
            }
        }
        confirmData.innerHTML = dataHtml;
        confirmModal.style.display = 'block';
    });

    confirmCreate.addEventListener('click', function() {
        confirmCreate.disabled = true;
        confirmCreate.textContent = 'Enviando...';
        crearForm.submit();
    });

    cancelCreate.addEventListener('click', function() {
        confirmModal.style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target == confirmModal) {
            confirmModal.style.display = 'none';
        }
    }
});
