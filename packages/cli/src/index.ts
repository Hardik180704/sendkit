import { Command } from "commander";
import { sendTelegramMessage } from "sendkit-core";

const program = new Command();

program
    .name("sendkit")
    .description("Sendkit tutorial for CLI")
    .command("telegram")
    .description("Send a telegram message")
    .argument("<chatId>", "Telegram chat ID")
    .argument("<message>", "Message text to send")
    .action(async (chatId: string, message: string) => {
        const token = process.env.TELEGRAM_BOT_TOKEN;
        if(!token) {
            console.error("TELEGRAM_BOT_TOKEN not found in .env");
            process.exit(1);
        }

        if(!chatId) {
            console.error("Missing Telegram chat ID");
            process.exit(1);
        }

        if(!message) {
            console.error("Missing telegram message text");
            process.exit(1);
        }

        try {
            const result = await sendTelegramMessage({
                botToken: token,
                chatId,
                message
            });
            console.log(`Telegram message sent to chat ${chatId}`);
            console.log(`Message ID: ${result.messageId}`);
        } catch(error) {
            const detail = error instanceof Error ? error.message : String(error);
            console.error(`Telegram API request failed: ${detail}`);
            process.exit(1);
        }
    });

program.parseAsync(process.argv);

    