document.getElementById('registerBtn').addEventListener('click', async () => {
	const email = document.getElementById('email').value;
	const response = await fetch('/register', {
			method: 'POST',
			headers: {
					'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
	});

	if (response.ok) {
			alert('Регистрация успешна!');
			document.getElementById('registration').style.display = 'none';
			document.getElementById('calculator').style.display = 'block';
	} else {
			alert('Ошибка регистрации.');
	}
});

document.getElementById('calculateBtn').addEventListener('click', async () => {
	const number1 = parseFloat(document.getElementById('number1').value);
	const number2 = parseFloat(document.getElementById('number2').value);
	const response = await fetch('/calculate', {
			method: 'POST',
			headers: {
					'Content-Type': 'application/json'
			},
			body: JSON.stringify({ number1, number2 })
	});

	const result = await response.json();
	document.getElementById('result').innerText = `Сумма: ${result.sum}`;
});
