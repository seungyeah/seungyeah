---
title: "Rust 열거형과 패턴 매칭"
date: 2024-01-07
draft: false
tags: ["rust", "programming", "enum"]
series: ["Rust 완벽 가이드"]
description: "Rust의 열거형과 패턴 매칭에 대해 배워봅니다."
toc: true
---

## 열거형 정의

열거형은 하나의 타입이 여러 가지 값 중 하나를 가질 수 있을 때 사용합니다.

```rust
enum IpAddrKind {
    V4,
    V6,
}
```

## 데이터를 가지는 열거형

```rust
enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(String),
}

let home = IpAddr::V4(127, 0, 0, 1);
let loopback = IpAddr::V6(String::from("::1"));
```

## Option 열거형

Rust에는 null이 없는 대신 `Option<T>` 열거형을 제공합니다.

```rust
enum Option<T> {
    Some(T),
    None,
}
```

## match를 이용한 패턴 매칭

```rust
fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}
```
