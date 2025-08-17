---
title: "Rust 클로저와 이터레이터"
date: 2024-01-12
draft: false
tags: ["rust", "programming", "closures"]
series: ["Rust 완벽 가이드"]
description: "Rust의 클로저와 이터레이터를 배워봅니다."
toc: true
---

## 클로저

클로저는 익명 함수로, 환경의 변수를 캡처할 수 있습니다.

```rust
let expensive_closure = |num| {
    println!("calculating slowly...");
    thread::sleep(Duration::from_secs(2));
    num
};

// 간단한 형태
let add_one = |x| x + 1;
let five = add_one(4);
```

## 이터레이터

이터레이터는 컬렉션의 아이템들을 순회할 수 있게 해줍니다.

```rust
let v1 = vec![1, 2, 3];
let v1_iter = v1.iter();

for val in v1_iter {
    println!("Got: {}", val);
}
```

## 이터레이터 어댑터

이터레이터를 변환하는 메소드들입니다.

```rust
let v1: Vec<i32> = vec![1, 2, 3];
let v2: Vec<_> = v1.iter().map(|x| x + 1).collect();

let filtered: Vec<_> = v1.iter()
    .filter(|&x| *x > 1)
    .collect();
```
