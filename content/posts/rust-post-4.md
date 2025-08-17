---
title: "Rust 소유권 시스템 이해하기"
date: 2024-01-04
draft: false
tags: ["rust", "programming", "ownership"]
series: ["Rust 완벽 가이드"]
description: "Rust의 핵심인 소유권 시스템에 대해 깊이 알아봅니다."
toc: true
---

## 소유권이란?

소유권(Ownership)은 Rust의 핵심 특징으로, 메모리 안전성을 보장하면서도 가비지 컬렉터 없이 메모리를 관리할 수 있게 해줍니다.

## 소유권 규칙

1. Rust의 각 값은 소유자(owner)를 가집니다.
2. 한 번에 딱 하나의 소유자만 존재할 수 있습니다.
3. 소유자가 스코프를 벗어나면, 값이 버려집니다.

## Move 의미론

```rust
let s1 = String::from("hello");
let s2 = s1; // s1이 s2로 move됨
// println!("{}", s1); // 에러! s1은 더 이상 유효하지 않음
```

## Clone을 이용한 복사

```rust
let s1 = String::from("hello");
let s2 = s1.clone(); // 깊은 복사
println!("{}, {}", s1, s2); // 정상 작동
```
