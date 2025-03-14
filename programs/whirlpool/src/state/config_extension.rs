use anchor_lang::prelude::*;

#[account]
pub struct WhirlpoolsConfigExtension {
    pub whirlpools_config: Pubkey,          // 32
    pub config_extension_authority: Pubkey, // 32
    pub token_badge_authority: Pubkey,      // 32
                                            // 512 RESERVE
}

impl WhirlpoolsConfigExtension {
    pub const LEN: usize = 8 + 32 + 32 + 32 + 512;

    pub fn initialize(
        &mut self,
        whirlpools_config: Pubkey,
        default_authority: Pubkey,
    ) -> Result<()> {
        self.whirlpools_config = whirlpools_config;
        self.config_extension_authority = default_authority;
        self.token_badge_authority = default_authority;
        Ok(())
    }

    pub fn update_config_extension_authority(&mut self, config_extension_authority: Pubkey) {
        self.config_extension_authority = config_extension_authority;
    }

    pub fn update_token_badge_authority(&mut self, token_badge_authority: Pubkey) {
        self.token_badge_authority = token_badge_authority;
    }
}

