// Firebase ব্যবহারের উদাহরণ (বিকল্প হিসেবে)
// বা AJAX দিয়ে নিজের সার্ভারে ডেটা পাঠানো

document.getElementById('postForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const content = document.getElementById('content').value;
    const imageFile = document.getElementById('image').files[0];
    
    // নতুন পোস্ট তৈরি
    const postElement = document.createElement('div');
    postElement.className = 'col-md-8 mx-auto';
    postElement.innerHTML = `
        <div class="card shadow">
            <div class="card-body">
                <h5 class="card-title"><i class="fas fa-user"></i> ${name}</h5>
                <p class="card-text">${content}</p>
                ${imageFile ? `<img src="${URL.createObjectURL(imageFile)}" class="post-image" alt="Post Image">` : ''}
                <div class="mt-3">
                    <button class="btn btn-sm btn-outline-primary like-btn">
                        <i class="fas fa-thumbs-up"></i> লাইক
                    </button>
                    <button class="btn btn-sm btn-outline-secondary comment-btn">
                        <i class="fas fa-comment"></i> কমেন্ট
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('postContainer').prepend(postElement);
    
    // ফর্ম রিসেট
    document.getElementById('postForm').reset();
    
    // এখানে সার্ভারে ডেটা সেভ করার কোড যোগ করতে হবে
    // উদাহরণ: fetch API ব্যবহার করে
    /*
    const formData = new FormData();
    formData.append('name', name);
    formData.append('content', content);
    if(imageFile) formData.append('image', imageFile);
    
    fetch('/api/posts', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
    */
});