CREATE OR REPLACE FUNCTION public.grant_designated_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  IF NEW.email_confirmed_at IS NOT NULL AND lower(COALESCE(NEW.email, '')) = 'assogbadenis710@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$function$;
REVOKE EXECUTE ON FUNCTION public.grant_designated_admin() FROM PUBLIC, anon, authenticated;
