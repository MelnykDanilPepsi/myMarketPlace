async function validateDB(str,type) {
    str = str.toLowerCase();
    const flag = await fetch(`/auth/CheckLogin`,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({valueType: type, value: str})
    })
        .then(res => res.json())
        .then(data => {
            return data.flag;
        })
        .catch(e => console.log(e));

    return flag;
}


