import { storage } from "../Configs/firebase";

export const UploadImgToFirebase = (img: any) => {
    return {
        Upload: () => storage.ref(`images/${img.name}`).put(img),
        GetUrl: () => storage.ref("images").child(img.name).getDownloadURL(),
        UploadWithProgress: () =>
            storage
                .ref(`images/${img.name}`)
                .put(img)
                .on(
                    "state_changed",
                    (snap) => {
                        var progress = (snap.bytesTransferred / snap.totalBytes) * 100;
                        console.log("Upload is " + progress + "% done");
                    },
                    (err) => {
                        console.log(err);
                    }
                ),
    };
};