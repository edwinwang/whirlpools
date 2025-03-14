use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct TokenBadge {
    pub whirlpools_config: Pubkey, // 32
    pub token_mint: Pubkey,        // 32
                                   // 128 RESERVE
}

impl TokenBadge {
    pub const LEN: usize = 8 + 32 + 32 + 128;

    pub fn initialize(&mut self, whirlpools_config: Pubkey, token_mint: Pubkey) -> Result<()> {
        self.whirlpools_config = whirlpools_config;
        self.token_mint = token_mint;
        Ok(())
    }
}
