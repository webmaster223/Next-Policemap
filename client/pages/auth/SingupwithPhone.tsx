import React, { useState, FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactModal from "react-modal";
import { Inter } from 'next/font/google'
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { X } from 'react-feather';
import styles from "./auth.module.css"
import signInwithphone from "@/firebase/auth/signinwithphone";
import { login } from "../../store/actions/authAction"

const inter = Inter({ subsets: ['latin'] })

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
}
// const Home: NextPage<Props> = ({ title }) => {
const SPModal: FC<ModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const goDescription = () => {
    router.push('/description/AppDescription');
  }

  const [phoneNumber, setPhonenumber] = useState("");
  const [verifycode, setVerifycode] = useState("");
  const [loginError, setLoginError] = useState(false);

  const changePhonenumber = (e: any) => {
    setPhonenumber(e.target.value)
  }
  const changeVerifycode = (e: any) => {
    setVerifycode(e.target.value)
  }

  const handleForm = async (event: any) => {
    event.preventDefault()

    const { result, error } = await signInwithphone(phoneNumber);
    // console.log('result', result, error);

    if (error) {
      setLoginError(true);
      return console.log(error)
    }

    localStorage.setItem("Idtoken", `Bearer ${result._tokenResponse.idToken}`);
    // else successful
    // dispatch(login());
  }

  return (
    <>
      <main className={`relative flex flex-col items-center justify-between ${inter.className}`}>
        <ReactModal
          isOpen={isOpen}
          onRequestClose={onClose}
          contentLabel="Login Modal"
          className={styles.Main}
        >
          <div className={styles.Head}>
            <h1 className={styles.Name}>初めての方</h1>
            <X className={styles.CrossButton} onClick={onClose}></X>
          </div>
          <div id="recaptcha-container"></div>
          <form onSubmit={handleForm} className={styles.Content}>
            <input placeholder="080xxxxyyyy" type="text" value={phoneNumber} onChange={changePhonenumber} />
            {/* <input placeholder="******" type="password" value={verifycode} onChange={changeVerifycode} /> */}
            {(loginError) && <p className={styles.Error}>正しくない</p>}
            <button type="submit">次へ</button>
          </form>
        </ReactModal>
      </main>
    </>
  )
}

export default SPModal;