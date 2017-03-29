(function() { // protect the lemmings
	

	//FORM CODE
	document.querySelector('form').addEventListener('submit', (event)=>{
		event.preventDefault()
		console.log(event.target.potato.value)
		event.target.potato.value = ''
	});

	function GET(url) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('GET', url);
			request.onload = () => {
				const data = JSON.parse(request.responseText);
				resolve(data)
			}; 
			request.onerror = (err) => {
				reject(err)
			};
			// request.send();
		});
	} // GET

	function POST(url, data) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('POST', url);
			request.setRequestHeader('Content-Type', 'application/json');

			request.onload = () => {
				const data = JSON.parse(request.responseText);
				resolve(data)
			}; 
			request.onerror = (err) => {
				reject(err)
			};

			request.send(JSON.stringify(data));
		});
	} // POST

	function PUT(url, data) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open('PUT', url);
			request.setRequestHeader('Content-Type', 'application/json');

			request.onload = () => {
				const data = JSON.parse(request.responseText);
				resolve(data)
			}; 
			request.onerror = (err) => {
				reject(err)
			};

			// request.send(JSON.stringify(data));
		});
	} // POST

	function render(blogItems) {
		const container = document.querySelector('.js-Bloglist');
		container.innerHTML = '';
		for (const blogItem of blogItems) {
			const li = document.createElement('li');
			li.innerHTML = `
${blogItem.data.blog}
			`;

			if (blogItem.data.isDone) {
				li.innerHTML += `<span class="glyphicon glyphicon-check bloglist-icon js-blog-check green"></span>`
			}
			else {
				li.innerHTML += `<span class="glyphicon glyphicon-unchecked bloglist-icon js-blog-check"></span>`
			}


			li.classList.add('list-group-item', 'bloglist-item');

			container.appendChild(li);
			
			li.querySelector('.js-blog-check').addEventListener('click', (e) => {
				console.log(todoItem);
				let isDone;
				if (blogItem.data.isDone) {
					isDone = false;
				}
				else {
					isDone = true;
				}

				PUT('/api/blog/' + blogItem.id, {isDone})
					.then((data) => {
						render(data);
					})
					.catch((e) => {
						alert(e)
					})
			})
			
		}

		if (blogItems.length === 0) {
			container.innerHTML = `
<li class="list-group-item">
No blogitems!
</li>
			`;
		} 
	} // render


	GET('/api/blogs')
		.then((blogItems) => {
			render(blogItems);
		});

	document.querySelector('.js-add-blog').addEventListener('click', (e) => {
		const input = document.querySelector('.js-blog-text');
		// input.setAttribute('disabled', 'disabled');

		POST('/api/blogs', {
			blog: input.value,
			when: new Date().getTime() + 9 * 60 * 60 * 1000
		}).then((data) => {
			input.removeAttribute('disabled');
			input.value = '';
			render(data);
		});
	})


})();
