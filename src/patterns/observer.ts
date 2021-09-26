/**
 * Observer from the Notifier/Observer pattern
 */
interface Observer
{
    /**
     * What to do on notification ?
     */
    notify(): void;
}