//Get data


//listen for auth status changes
auth.onAuthStateChanged(user=>  //if logout user==null
    {
        setupUI(user);
        if(user)
        {
            db.collection('guides').onSnapshot(snapshot=>
                {
                    setupGuides(snapshot.docs);
                });
        }
        else{
            setupGuides([]);
        }
    });
//create new guide
const createForm=document.querySelector('#create-form');
createForm.addEventListener('submit',(e)=>
{
    e.preventDefault();
    db.collection('guides').add({
        title: createForm['title'].value,
        content: createForm['content'].value
    }).then(()=>
    {
        const modal=document.querySelector("#modal-create");
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }
    )
})

// signup
const signupForm=document.querySelector('#signup-form');

signupForm.addEventListener('submit',(e)=>
{
    e.preventDefault();

    //get user info
    const email=signupForm['signup-email'].value;
    const Password=signupForm['signup-password'].value;
    
    //sign up the user
    
    //asyncronous task, we could use a promise
    auth.createUserWithEmailAndPassword(email,Password).then( cred =>
        {
            //cred //returns a cred that is the data of the new acc
            return db.collection('users').doc(cred.user.uid).set(
                {
                    bio:signupForm['signup-bio'].value
                }
            );
        }).then(()=>
    {
        const modal=document.querySelector("#modal-signup");
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
    
});
//logout
const logout=document.querySelector('#logout');
logout.addEventListener('click',(e)=>
{
    e.preventDefault();

    auth.signOut();
})
//login
const loginForm=document.querySelector('#login-form');
loginForm.addEventListener('submit',(e)=>
{
    e.preventDefault();
    const email=loginForm['login-email'].value;
    const Password=loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email,Password).then(cred=>
        {
            //console.log(cred);
            const modal=document.querySelector("#modal-login");
            M.Modal.getInstance(modal).close();
            loginForm.reset();
        }
    )
})