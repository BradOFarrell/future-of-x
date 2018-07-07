class Content{
    public get(key: string){
        switch(key) {
            case "intro": return (
                true
            );
            case "lookingforward": return (
                true
            );
            case "reveal": return (
                true
            );
            case "alternatefuture": return (
                true
            );
            case "headline": return (
                true
            );
            default: return (true);
        }
    }
}

export default new Content();