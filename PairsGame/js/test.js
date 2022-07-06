const test = async () => {
    await new Promise((resolve)=>setTimeout(() => {
        console.log("timeout");
        resolve();
    }, 2000)); 
}

test();
console.log('finished');