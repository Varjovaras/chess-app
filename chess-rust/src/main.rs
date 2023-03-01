fn main() {
    println!("Hello, world!");
    chess();
}

struct Board {}

struct Square {}

fn chess() {
    let board = [[0 as u8; 8]; 8];
    println!("{:?}", board);
}
