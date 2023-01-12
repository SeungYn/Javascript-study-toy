# CSS

inset은 저걸 한번에 쓸수 있게 해줌

**inset(top right bottom left)**

이렇게 inset을 사용하면 부모로부터 3px 떨어지게 공간을 채움

```css
.card .lines::after {
  content: '';
  position: absolute;
  inset: 3px;
  background-color: #000;
}
```

```css
.card .lines::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 120px;
  background: linear-gradient(
    transparent,
    #45f3ff,
    #45f3ff,
    #45f3ff,
    transparent
  );
  animation: animate 4s linear infinite;
}

@keyframes animate {
  0% {
    //이부분에서 translate를 또해주는 이유는 rotate만 하면 초기화가 되기 때문
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
```

filter: grayscale(1); 흑백 사진처럼 해줌

# 결과

<img src='결과1' />
<img src='결과2' />
