function updateProgress(data, setProgress) {
    let percent = ((data.filter(task => task.done)).length / data.length)
    setProgress(percent)
    
}

export {updateProgress}