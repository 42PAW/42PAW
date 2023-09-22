import { removeCookie } from "@/api/cookie/cookies";
import React, { useEffect, useRef } from "react";

import styled from "styled-components";

const phrases = [
  "404 Not Found",
  "404 찾을 수 없음",
  "404 Nicht gefunden",
  "404 Introuvable",
  "404 ページが見つかりません",
  "404 Non Trovato",
  "404 No Encontrado",
  "404 Страница не найдена",
  "404 Não Encontrado",
];

const phrases2 = [
  "Back to main",
  "메인으로 돌아가기",
  "Zurück zur Hauptseite",
  "Retour à la page principale",
  "メインに戻る",
  "Torna alla pagina principale",
  "Volver a la página principal",
  "Назад на главную",
  "Voltar para a página principal",
];

const NotFoundPage: React.FC = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current!;
    const fx = new TextScramble(el);
    const el2 = textRef2.current!;
    const fx2 = new TextScramble(el2);

    let counter = 0;
    let counter2 = 0;
    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 1000);
      });
      counter = (counter + 1) % phrases.length;
      fx2.setText(phrases2[counter2]).then(() => {
        setTimeout(next, 1000);
      });
      counter2 = (counter2 + 1) % phrases.length;
    };

    next();
  }, []);

  return (
    <WrapperStyled>
      <Container>
        <Text ref={textRef}></Text>
        <Text2
          ref={textRef2}
          onClick={() => {
            removeCookie("access_token", {
              path: "/",
              domain: `${import.meta.env.VITE_FE_DOMAIN}`,
            });
            window.location.replace("/");
          }}
        ></Text2>
      </Container>
    </WrapperStyled>
  );
};

const WrapperStyled = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  text-align: center;
  font-weight: 100;
  font-family: "Roboto Mono";
  font-size: 6vw;
  color: #fafafa;
`;

const Text2 = styled.div`
  text-align: center;
  cursor: pointer;
  font-weight: 100;
  font-family: "Roboto Mono";
  margin-top: 10px;
  font-size: 2vw;
  color: var(--pink);
  background-color: #fafafa;
  border: 1px solid #fafafa;
  padding: 10px 20px;
  border-radius: 50px;
`;

class TextScramble {
  el: HTMLDivElement;
  chars: string;
  frameRequest: number | null;
  frame: number;
  queue: Array<any>;
  resolve: () => void;

  constructor(el: HTMLDivElement) {
    this.el = el;
    this.chars =
      "찾을тницNãoEncontradoннйдн수없음NotFoundメインに戻るIntrouvableページが見つかりません";
    this.frameRequest = null;
    this.frame = 0;
    this.queue = [];
    this.resolve = () => {};
    this.update = this.update.bind(this);
    this.randomChar = this.randomChar.bind(this);
  }

  setText(newText: string): Promise<void> {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise<void>((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 80);
      const end = start + Math.floor(Math.random() * 80);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest!);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

export default NotFoundPage;
