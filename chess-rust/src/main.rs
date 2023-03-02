fn main() {
    println!("Hello, world!");
    chess();
}

#[derive(Debug, Copy, Clone)]
enum Color {
    White,
    Black,
}

// fn str_helper(file_iterator: usize, rank: u8) -> String {
//     let mut s = String::new();
//     s.push(Board::FILES[file_iterator]);
//     s.push(rank as char);
//     return s;
// }

#[derive(Debug)]
struct Board {
    board: [Square; 64],
}

impl Board {
    const FILES: [char; 8] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    fn new() -> Board {
        // let sq = Square::new('a', 1, String::from("a1"), Color::White, 1);
        let mut board: [Square; 64] = [Square {
            file: 'a',
            rank: 1,
            square_color: Color::White,
            id: 1,
            piece: None,
        }; 64];
        let mut rank: u8 = 1;
        let mut file_iterator: usize = 0;
        let mut first_square: Color = Color::Black;
        let mut second_square: Color = Color::White;
        for i in 0..64 {
            if file_iterator == 8 {
                file_iterator = 0;
                rank += 1;
                std::mem::swap(&mut first_square, &mut second_square);
            }
            if i % 2 == 0 {
                board[i] = Square::new(
                    Board::FILES[file_iterator],
                    rank as u8,
                    first_square,
                    i as u8,
                )
            } else {
                board[i] = Square::new(
                    Board::FILES[file_iterator],
                    rank as u8,
                    second_square,
                    i as u8,
                )
            }
            file_iterator += 1;
        }
        return Board { board };
    }
}
#[derive(Debug, Copy, Clone)]
struct Square {
    file: char,
    rank: u8,
    square_color: Color,
    id: u8,
    piece: Option<Piece>,
}

impl Square {
    fn new(file: char, rank: u8, square_color: Color, id: u8) -> Square {
        Square {
            file,
            rank,
            square_color,
            id,
            piece: None,
        }
    }
}

// impl Copy for Square<'_> {}

// impl Clone for Square<'_> {
//     fn clone(&self) -> Square {
//         *self
//     }
// }
#[derive(Debug)]
struct Piece {}

impl Copy for Piece {}

impl Clone for Piece {
    fn clone(&self) -> Piece {
        *self
    }
}

fn chess() {
    let board = Board::new();
    println!("{:?}", board);
}

// enum Simple {
//     Error(String),
//     Okay,
//     Foo([u32; 5]),
// }

// impl Clone for Simple {
//     fn clone(&self) -> Simple {
//         match self {
//             Error(a) => Error(a.to_string()),
//             Okay => Okay,
//             Foo(a) => Foo(a.clone()),
//         }
//     }
// }
