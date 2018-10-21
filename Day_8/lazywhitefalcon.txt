import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class HeavyLightWhiteFalcon {
	static List<Integer>[] conn;
	static long[] v;
	static int[] d;
	static int[] p;
	static int count;

	public static void main(String[] args) {

		Scanner sc = new Scanner(System.in);
		int n = sc.nextInt();
		int q = sc.nextInt();
		int r = 0;
		long time = System.currentTimeMillis();
		count = n;
		conn = new List[n + 1];
		v = new long[n + 1];
		d = new int[n + 1];
		p = new int[n + 1];

		for (int i = 0; i < n - 1; i++) {
			int x = sc.nextInt();
			int y = sc.nextInt();

			List<Integer> xconn = conn[x];
			if (xconn == null) {
				xconn = new ArrayList<Integer>();
				conn[x] = xconn;
			}

			List<Integer> yconn = conn[y];
			if (yconn == null) {
				yconn = new ArrayList<Integer>();
				conn[y] = yconn;
			}

			xconn.add(y);
			yconn.add(x);
		}

		d[r] = 1;
		treefy3(r);

		for (int i = 0; i < q; i++) {
			String uq = sc.next();

			if ("1".equals(uq)) {
				int u = sc.nextInt();
				int va = sc.nextInt();

				v[u] = va;
				;
			} else {
				int u = sc.nextInt();
				int v = sc.nextInt();

				long s = sum(u, v);
				System.out.println(s);
			}
		}

		// System.out.println(System.currentTimeMillis() - time);

	}

	private static long sum(int un, int vn) {
		long max = 0;

		int rn = un;
		if (d[un] <= d[vn]) {
			rn = vn;
		}

		int abs = Math.abs(d[vn] - d[un]);
		for (int i = 0; i < abs; i++) {
			if (v[rn] > max) {
				max = v[rn];
			}
			rn = p[rn];
		}

		if (d[un] <= d[vn]) {
			vn = rn;
		} else {
			un = rn;
		}

		while (un != vn) {
			if (v[un] > max) {
				max = v[un];
			}
			if (v[vn] > max) {
				max = v[vn];
			}
			un = p[un];
			vn = p[vn];
		}
		if (v[un] > max) {
			max = v[un];
		}

		return max;
	}

	private static void treefy3(int rn) {
		int[] iq = new int[count];
		int idx = 0;
		iq[idx] = rn;

		while (idx >= 0) {
			int n = iq[idx];
			idx--;
			int s = conn[n].size();
			int dd = d[n] + 1;
			for (int i = 0; i < s; i++) {
				int cn = conn[n].get(i);

				if (d[cn] == 0) {
					p[cn] = n;
					d[cn] = dd;
					idx++;
					iq[idx] = cn;
				}
			}
		}
	}
}